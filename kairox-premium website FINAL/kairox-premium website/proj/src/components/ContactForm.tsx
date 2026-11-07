'use client';

import { useRef, useState, type FormEvent } from 'react';
import { ArrowRight, Check, LoaderCircle } from 'lucide-react';
import { services } from '@/lib/services';
import { budgetOptions, industryOptions } from '@/lib/contact-options';

type FormState = { kind: 'idle' | 'loading' | 'success' | 'error'; message: string };

export function ContactForm() {
  const [state, setState] = useState<FormState>({ kind: 'idle', message: '' });
  const startedAt = useRef<number | null>(null);

  function noteInteraction() {
    startedAt.current ??= Date.now();
    if (state.kind === 'success' || state.kind === 'error') setState({ kind: 'idle', message: '' });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state.kind === 'loading') return;
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set('formStartedAt', String(startedAt.current ?? Date.now()));
    setState({ kind: 'loading', message: 'Sending your enquiry securely…' });
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const result = await response.json().catch(() => null) as { ok?: boolean; message?: string } | null;
      if (!response.ok || !result?.ok) {
        setState({ kind: 'error', message: result?.message ?? 'Your enquiry could not be sent. Please review your details and try again.' });
        return;
      }
      form.reset();
      startedAt.current = null;
      setState({ kind: 'success', message: result.message ?? 'The email service accepted your enquiry.' });
    } catch {
      setState({ kind: 'error', message: 'We could not reach the enquiry service. Your message has not been confirmed as sent.' });
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} onFocusCapture={noteInteraction} onChangeCapture={noteInteraction}>
      <div className="form-honeypot" aria-hidden="true"><label htmlFor="website">Leave this field empty</label><input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
      <div className="form-grid">
        <label className="form-field"><span>Full name <b>*</b></span><input name="fullName" autoComplete="name" placeholder="Your name" required minLength={2} maxLength={100} /></label>
        <label className="form-field"><span>Business name <b>*</b></span><input name="businessName" autoComplete="organization" placeholder="Your business" required minLength={2} maxLength={120} /></label>
        <label className="form-field"><span>Email <b>*</b></span><input name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={254} /></label>
        <label className="form-field"><span>Phone <b>*</b></span><input name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="Your number" required minLength={7} maxLength={32} pattern={"(?=(?:\\D*\\d){7,})\\+?[0-9\\s\\(\\)\\.\\-]+"} title="Enter at least seven digits; spaces, +, parentheses, periods and hyphens are optional." /></label>
        <label className="form-field"><span>Industry <b>*</b></span><select name="industry" required defaultValue=""><option value="" disabled>Select an industry</option>{industryOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="form-field"><span>Service required <b>*</b></span><select name="service" required defaultValue=""><option value="" disabled>Select a service</option>{services.map((item) => <option value={item.title} key={item.slug}>{item.title}</option>)}<option value="Not sure yet">Not sure yet</option></select></label>
        <label className="form-field form-field--full"><span>Project description <b>*</b></span><textarea name="description" placeholder="What would you like to improve or build?" required minLength={20} maxLength={5000} rows={5} /></label>
        <label className="form-field"><span>Optional budget</span><select name="budget" defaultValue="">{budgetOptions.map((option) => <option value={option.value} key={option.value || 'not-provided'}>{option.label}</option>)}</select></label>
      </div>
      <fieldset className="contact-choice"><legend>Preferred contact method <b>*</b></legend><div>{['Email', 'Phone', 'WhatsApp'].map((method) => <label key={method}><input type="radio" name="preferredContact" value={method.toLowerCase()} required /><span>{method}</span></label>)}</div></fieldset>
      <div className="form-submit-row">
        <button className="button button--primary" type="submit" disabled={state.kind === 'loading'}>
          {state.kind === 'loading' ? <><LoaderCircle size={17} className="spin" aria-hidden="true" /> Sending…</> : state.kind === 'success' ? <><Check size={17} aria-hidden="true" /> Accepted</> : <>Send enquiry <ArrowRight size={17} aria-hidden="true" /></>}
        </button>
        <p>Your details are used only to respond to your enquiry.</p>
      </div>
      {state.message ? <p className={`form-message form-message--${state.kind}`} role={state.kind === 'error' ? 'alert' : 'status'} aria-live="polite">{state.message}</p> : null}
      <p className="form-note">A confirmation appears only after the email service accepts your message. Until delivery is configured, the form will tell you it is unavailable rather than mark an enquiry as sent.</p>
    </form>
  );
}
