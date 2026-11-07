import Link from 'next/link';
import { ArrowDown, ArrowUpRight, MessageCircle, ShieldCheck, Phone, Mail } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import { pageMetadata } from '@/lib/metadata';
import { contactConfig } from '@/lib/site';

export const metadata = pageMetadata('Contact Us', 'Tell us about your business and the digital solution you have in mind.', '/contact');

export default function ContactPage() {
  return (
    <main id="main" className="inner-page contact-page">
      <section className="page-hero wrap">
        <p className="eyebrow"><span className="eyebrow-mark" />Contact / The next step</p>
        <h1>Tell us what<br /><span>you&apos;re working on.</span></h1>
        <div className="page-hero-bottom"><p>A little context goes a long way. Share what you&apos;re building or improving and we&apos;ll help you find a useful place to start.</p><span className="contact-availability"><i /> Enquiries by project form</span></div>
        <a href="#enquiry-form" className="scroll-hint"><ArrowDown size={15} /> Fill in the details</a>
      </section>
      <section id="enquiry-form" className="contact-content section-pad">
        <div className="wrap contact-layout">
          <div className="contact-intro">
            <p className="eyebrow"><span className="eyebrow-mark" />A good brief begins here</p>
            <h2>What does<br /><span>better look like?</span></h2>
            <p>Tell us about your business, your customers and what you&apos;d like to change. The details help us understand the idea before we recommend a next step.</p>
            <div className="contact-assurance"><ShieldCheck size={17} /><span>When the email integration is configured, your information is sent securely through it. We don&apos;t show a success message unless the service accepts the message.</span></div>
            
            <div className="contact-direct">
              <span className="mono-label">CONTACT INFORMATION</span>
              <div className="contact-methods">
                <a href={`mailto:${contactConfig.email}`} className="contact-method">
                  <Mail size={17} />
                  <span>{contactConfig.email}</span>
                </a>
                {contactConfig.phones.map((phone, index) => (
                  <a key={index} href={`tel:${phone.digitsOnly}`} className="contact-method">
                    <Phone size={17} />
                    <span>{phone.number}</span>
                  </a>
                ))}
                <span className="mono-label">WHATSAPP</span>
                <div className="whatsapp-buttons">
                  {contactConfig.phones
                    .filter((phone) => phone.whatsappEnabled)
                    .map((phone, index) => (
                      <a
                        key={index}
                        href={`https://wa.me/${phone.digitsOnly}`}
                        target="_blank"
                        rel="noreferrer"
                        className="direct-link"
                      >
                        <MessageCircle size={17} />
                        WhatsApp {phone.label} <ArrowUpRight size={15} />
                      </a>
                    ))}
                  {contactConfig.phones.every((phone) => !phone.whatsappEnabled) && (
                    <p className="direct-unavailable"><MessageCircle size={16} /> WhatsApp contact isn&apos;t configured yet.</p>
                  )}
                </div>
              </div>
            </div>
            <Link href="/privacy" className="privacy-shortlink">How we handle enquiry information <ArrowUpRight size={14} /></Link>
          </div>
          <div className="contact-form-panel">
            <div className="form-panel-head"><div><p className="mono-label">PROJECT ENQUIRY</p><h2>Let&apos;s get the context.</h2></div><span className="required-note">* Required</span></div>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}