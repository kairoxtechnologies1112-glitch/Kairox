'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { ArrowRight, CalendarDays, Check, ChevronDown, CircleCheck, Clock3, Filter, MapPin, MessageCircle, Search, Sparkles, Utensils, Workflow } from 'lucide-react';
import { contactConfig } from '@/lib/site';

type DemoKind = 'restaurant-website' | 'lead-management-system' | 'appointment-management-system' | 'business-automation-system';

export function DemoPlayground({ kind }: { kind: DemoKind }) {
  if (kind === 'restaurant-website') return <RestaurantDemo />;
  if (kind === 'lead-management-system') return <CrmDemo />;
  if (kind === 'appointment-management-system') return <AppointmentDemo />;
  return <AutomationDemo />;
}

const food = [
  { name: 'Roasted tomato & ricotta', type: 'Small plates', note: 'Whipped ricotta · basil oil · sourdough', price: '$14' },
  { name: 'Citrus-glazed salmon', type: 'Mains', note: 'Seasonal greens · brown butter · herbs', price: '$28' },
  { name: 'Wild mushroom risotto', type: 'Mains', note: 'Wild mushrooms · parmesan · thyme', price: '$24' },
  { name: 'Olive oil cake', type: 'Desserts', note: 'Stone fruit · cultured cream', price: '$12' },
];

function RestaurantDemo() {
  const [category, setCategory] = useState('All');
  const [showReservation, setShowReservation] = useState(false);
  const [previewMessage, setPreviewMessage] = useState('');
  const whatsappPhones = contactConfig.phones.filter((p) => p.whatsappEnabled);
  const items = category === 'All' ? food : food.filter((item) => item.type === category);
  function reserve(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPreviewMessage('Demo preview only — no reservation was sent or made.');
  }

  return <div className="demo-window restaurant-demo">
    <div className="demo-window__bar"><span className="demo-dots"><i /><i /><i /></span><span>TABLE / RESTAURANT CONCEPT</span><span className="demo-live"><i /> DEMO</span></div>
    <div className="restaurant-layout">
      <div className="restaurant-main">
        <div className="restaurant-hero"><span className="demo-mono">A PLACE AT THE TABLE</span><Utensils size={28} strokeWidth={1.3} /><h3>Good food.<br /><em>Good company.</em></h3><p>A fictional neighbourhood kitchen shaped around seasonal plates and slow evenings.</p><div className="restaurant-details"><span><MapPin size={14} /> Restaurant info · sample</span><span><Clock3 size={14} /> Hours · sample</span></div></div>
        <div className="restaurant-menu-head"><div><span className="demo-mono">MADE FOR SHARING</span><h4>Today&apos;s menu</h4></div><div className="menu-tabs" role="group" aria-label="Filter menu by category">{['All', 'Small plates', 'Mains', 'Desserts'].map((name) => <button type="button" onClick={() => setCategory(name)} className={category === name ? 'is-active' : ''} key={name}>{name}</button>)}</div></div>
        <div className="menu-items">{items.map((item) => <article className="menu-item" key={item.name}><div><h5>{item.name}</h5><p>{item.note}</p><small>{item.type}</small></div><b>{item.price}</b></article>)}</div>
        <div className="restaurant-actions"><button className="demo-action" type="button" onClick={() => { setShowReservation((value) => !value); setPreviewMessage(''); }}><CalendarDays size={15} /> Reservation enquiry <ArrowRight size={15} /></button>{whatsappPhones.length > 0 ? whatsappPhones.map((phone, index) => <a key={index} className="demo-action demo-action--soft" href={`https://wa.me/${phone.digitsOnly}`} target="_blank" rel="noreferrer"><MessageCircle size={15} /> WhatsApp {phone.label}</a>) : <span className="demo-config-note"><MessageCircle size={14} /> WhatsApp not configured</span>}</div>
        {showReservation ? <form className="demo-reservation" onSubmit={reserve}><label>Name<input required placeholder="Sample name" maxLength={80} /></label><label>Date<input type="date" required min={new Date().toISOString().slice(0, 10)} /></label><label>Guests<select defaultValue="2"><option>1</option><option>2</option><option>3</option><option>4</option><option>5+</option></select></label><button type="submit" className="demo-action">Preview enquiry <ArrowRight size={15} /></button></form> : null}
        {previewMessage ? <p className="demo-honest-note" role="status">{previewMessage}</p> : null}
      </div>
      <aside className="restaurant-aside"><span className="demo-mono">THE IDEA</span><div className="restaurant-plate" aria-hidden="true"><span /><i /><b /></div><p>Warm details, a clear menu and low-friction enquiry—all in one small-screen-ready concept.</p><span className="sample-label">FICTIONAL CONCEPT · NO LIVE BOOKINGS</span></aside>
    </div>
  </div>;
}

type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Follow-up';
type Lead = { id: number; name: string; service: string; status: LeadStatus; followUp: string; initials: string };
const initialLeads: Lead[] = [
  { id: 1, name: 'Alex Rivera', service: 'Website development', status: 'Qualified', followUp: 'Today', initials: 'AR' },
  { id: 2, name: 'Sam Chen', service: 'Process automation', status: 'Contacted', followUp: 'Tomorrow', initials: 'SC' },
  { id: 3, name: 'Jordan Blake', service: 'Lead management', status: 'Follow-up', followUp: 'Nov 12', initials: 'JB' },
  { id: 4, name: 'Taylor Morgan', service: 'Custom software', status: 'New', followUp: 'Nov 14', initials: 'TM' },
];

function CrmDemo() {
  const [leads, setLeads] = useState(initialLeads);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All statuses');
  const [showFilter, setShowFilter] = useState(false);
  const filtered = useMemo(() => leads.filter((lead) => (filter === 'All statuses' || lead.status === filter) && `${lead.name} ${lead.service}`.toLowerCase().includes(query.toLowerCase())), [leads, filter, query]);
  const count = (status: LeadStatus) => leads.filter((lead) => lead.status === status).length;

  return <div className="demo-window crm-demo">
    <div className="demo-window__bar"><span className="demo-dots"><i /><i /><i /></span><span>PIPELINE / OVERVIEW</span><span className="demo-live"><i /> SAMPLE DATA</span></div>
    <div className="crm-shell">
      <aside className="crm-side"><div className="crm-mark">O</div><span className="crm-side-active">⌂</span><span>◫</span><span>◎</span><span>◷</span><div className="crm-avatar">U</div></aside>
      <div className="crm-main">
        <div className="crm-topbar"><span>Workspace <b>/</b> Leads</span><span className="crm-date">Today · Sample view</span></div>
        <div className="crm-title-row"><div><span className="demo-mono">YOUR OPPORTUNITIES</span><h3>Lead overview</h3><p>Fictional sample records · not actual customers</p></div><button className="crm-export" type="button" onClick={() => setLeads(initialLeads)}>Reset sample</button></div>
        <div className="crm-stats">{([['Active leads', leads.length, 'total records'], ['Qualified', count('Qualified'), 'sample status'], ['Follow-ups', count('Follow-up'), 'next actions']] as const).map(([label, value, hint]) => <div key={label}><span>{label}</span><b>{value.toString().padStart(2, '0')}</b><small>{hint}</small></div>)}</div>
        <div className="crm-chart"><div className="crm-chart-head"><div><span className="demo-mono">PIPELINE ACTIVITY</span><h4>Lead activity</h4></div><span className="sample-tag">Illustrative</span></div><div className="crm-chart-area" aria-label="Illustrative lead activity chart"><div className="chart-grid"><i /><i /><i /></div><svg viewBox="0 0 620 100" preserveAspectRatio="none" role="img" aria-label="Decorative sample trend line"><path d="M0 74 C45 66 70 45 108 57 S180 75 214 50 S279 53 314 38 S370 66 410 29 S467 49 504 33 S564 20 620 7" fill="none" stroke="url(#line)" strokeWidth="3" /><defs><linearGradient id="line" x1="0" x2="620" y1="0" y2="0"><stop stopColor="#9875ff" /><stop offset="1" stopColor="#48a5ff" /></linearGradient></defs></svg><div className="chart-axis"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></div></div>
        <div className="crm-table-head"><div><h4>Recent leads</h4><span>{filtered.length} shown</span></div><label className="crm-search"><Search size={14} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search leads" aria-label="Search sample leads" /></label><div className="crm-filter-wrap"><button className="crm-filter" type="button" onClick={() => setShowFilter((value) => !value)} aria-expanded={showFilter}><Filter size={14} /> Filter <ChevronDown size={14} /></button>{showFilter ? <div className="crm-filter-menu">{['All statuses', 'New', 'Contacted', 'Qualified', 'Follow-up'].map((option) => <button type="button" key={option} onClick={() => { setFilter(option); setShowFilter(false); }}>{option}</button>)}</div> : null}</div></div>
        <div className="crm-leads">{filtered.length ? filtered.map((lead) => <div className="crm-lead" key={lead.id}><span className="lead-initials">{lead.initials}</span><span className="lead-name"><b>{lead.name}</b><small>{lead.service}</small></span><label className={`lead-status lead-status--${lead.status.toLowerCase().replace(' ', '-')}`}><span className="sr-only">Status for {lead.name}</span><select value={lead.status} onChange={(event) => setLeads((current) => current.map((item) => item.id === lead.id ? { ...item, status: event.target.value as LeadStatus } : item))}>{['New', 'Contacted', 'Qualified', 'Follow-up'].map((status) => <option key={status}>{status}</option>)}</select></label><span className="lead-followup"><small>Follow-up</small><b>{lead.followUp}</b></span></div>) : <p className="crm-empty">No matching sample leads. Change the search or filter.</p>}</div>
      </div>
    </div>
  </div>;
}

const timeSlots = ['09:00', '10:30', '12:00', '14:30', '16:00'];
function AppointmentDemo() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [preview, setPreview] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setPreview(`${String(data.get('guest'))} · ${date} at ${time}. Demo preview only — no appointment was created.`);
  }
  return <div className="demo-window appointment-demo">
    <div className="demo-window__bar"><span className="demo-dots"><i /><i /><i /></span><span>APPOINTMENTS / BOOKING PREVIEW</span><span className="demo-live"><i /> DEMO</span></div>
    <div className="appointment-grid">
      <div className="booking-panel"><span className="demo-mono">A SIMPLE NEXT STEP</span><h3>Find a time<br />that works.</h3><p>Choose a date and time to explore the sample booking flow.</p>
        <form className="booking-form" onSubmit={submit}><label>Your name<input name="guest" required minLength={2} placeholder="Sample name" /></label><label>Email address<input name="guestEmail" type="email" required placeholder="you@example.com" /></label><label>Choose a date<input type="date" required min={new Date().toISOString().slice(0, 10)} value={date} onChange={(event) => { setDate(event.target.value); setPreview(''); }} /></label><span className="booking-label">Available sample times</span><div className="time-grid" role="group" aria-label="Choose a sample appointment time">{timeSlots.map((slot) => <button type="button" className={time === slot ? 'is-selected' : ''} key={slot} onClick={() => { setTime(slot); setSelectedSlot(slot); setPreview(''); }} aria-pressed={time === slot}>{slot}</button>)}</div><input type="hidden" name="selectedTime" value={selectedSlot} /><button className="demo-action demo-action--full" type="submit" disabled={!date || !time}>Preview booking <ArrowRight size={15} /></button></form>
        {preview ? <p className="demo-honest-note" role="status">{preview}</p> : null}
      </div>
      <aside className="schedule-panel"><div className="schedule-panel-head"><div><span className="demo-mono">ADMIN PREVIEW</span><h4>Upcoming</h4></div><CalendarDays size={19} /></div><div className="schedule-date"><b>Thu, 12</b><span>November · Sample schedule</span></div>{[['09:00', 'Sample consultation'], ['11:30', 'Project check-in'], ['14:00', 'Introductory call']].map(([hour, title]) => <div className="schedule-entry" key={hour}><span>{hour}</span><i /><div><b>{title}</b><small>Sample booking · not live</small></div></div>)}<div className="schedule-note"><CircleCheck size={16} /> Admin interface illustration</div></aside>
    </div>
  </div>;
}

const automationSteps = [
  { title: 'Customer enquiry', label: '01 · INCOMING', detail: 'A new enquiry enters through a website form or messaging channel.' },
  { title: 'Lead recorded', label: '02 · CAPTURE', detail: 'The sample workflow places the enquiry into a lead record.' },
  { title: 'Lead assigned', label: '03 · ROUTING', detail: 'An owner is attached so a teammate knows who follows up.' },
  { title: 'Follow-up', label: '04 · NEXT STEP', detail: 'A reminder is prepared with a useful due date and context.' },
  { title: 'Notification', label: '05 · ALERT', detail: 'A notification would be sent to the configured team channel.' },
  { title: 'Status updated', label: '06 · COMPLETE', detail: 'The sample lead status changes to show the process has moved on.' },
];
function AutomationDemo() {
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);
  function advance() {
    setRunning(true);
    setActive((step) => (step + 1) % automationSteps.length);
    window.setTimeout(() => setRunning(false), 360);
  }
  const step = automationSteps[active];
  return <div className="demo-window automation-demo">
    <div className="demo-window__bar"><span className="demo-dots"><i /><i /><i /></span><span>WORKFLOW / SAMPLE AUTOMATION</span><span className="demo-live"><i /> SIMULATION</span></div>
    <div className="automation-top"><div><span className="demo-mono">A WORKFLOW, MADE VISIBLE</span><h3>Enquiry to follow-up.</h3><p>Explore the steps in this fictional automation.</p></div><button className="workflow-run" type="button" onClick={advance}><Workflow size={16} /> Run next step</button></div>
    <div className="automation-path" aria-label="Sample workflow stages">{automationSteps.map((item, index) => <button className={`automation-step${active === index ? ' is-active' : ''}${index < active ? ' is-complete' : ''}`} type="button" key={item.title} aria-current={active === index ? 'step' : undefined} onClick={() => setActive(index)}><span className="automation-number">{index < active ? <Check size={13} /> : String(index + 1).padStart(2, '0')}</span><span className="automation-title">{item.title}</span>{index < automationSteps.length - 1 ? <span className="automation-connector" aria-hidden="true" /> : null}</button>)}</div>
    <div className={`automation-detail${running ? ' is-changing' : ''}`}><span className="automation-detail-icon"><Sparkles size={18} /></span><div><span className="demo-mono">{step.label}</span><h4>{step.title}</h4><p>{step.detail}</p></div><span className="simulated-badge">Sample state</span></div>
    <p className="automation-disclaimer">Simulation only. No real leads, assignments, follow-ups, notifications or status changes are created.</p>
  </div>;
}
