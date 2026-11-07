import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { pageMetadata } from '@/lib/metadata';
import { companyName, contactConfig } from '@/lib/site';

export const metadata = pageMetadata('Terms & Conditions', 'Terms and conditions for using the KAIROX Technologies website and engaging our services.', '/terms');

export default function TermsPage() {
  const effectiveDate = 'July 2025'; // Update before launch
  const governingLaw = 'India'; // Confirm before launch
  const jurisdiction = 'Mumbai, Maharashtra'; // Confirm before launch
  const registeredOffice = '[Registered office address &mdash; confirm before launch]';
  const legalContactEmail = contactConfig.email;

  return (
    <main id="main" className="inner-page legal-page">
      <section className="legal-hero wrap">
        <Link href="/" className="back-link"><ArrowLeft size={15} /> Home</Link>
        <p className="eyebrow"><span className="eyebrow-mark" />Information / Terms</p>
        <h1>Terms &<br /><span>conditions.</span></h1>
        <p className="legal-notice">Effective date: {effectiveDate}. Review all bracketed placeholders and confirm with legal counsel before publication.</p>
      </section>
      <article className="legal-content wrap">
        <section>
          <h2>1. Introduction and acceptance of terms</h2>
          <p>By accessing and using this website (<strong>&ldquo;Website&rdquo;</strong>), you agree to be bound by these Terms & Conditions (<strong>&ldquo;Terms&rdquo;</strong>). If you do not agree, please do not use the Website. These Terms constitute a legally binding agreement between you and <strong>{companyName}</strong> (<strong>&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;</strong>).</p>
        </section>

        <section>
          <h2>2. Website usage</h2>
          <p>You may use this Website for lawful purposes only. You must not:</p>
          <ul>
            <li>Use the Website in any way that violates applicable law or regulation.</li>
            <li>Attempt to gain unauthorized access to any part of the Website, its systems, or networks.</li>
            <li>Transmit any harmful code, viruses, or malicious software.</li>
            <li>Scrape, harvest, or extract content systematically without permission.</li>
            <li>Interfere with the Website&apos;s operation or other users&apos; access.</li>
          </ul>
        </section>

        <section>
          <h2>3. Accuracy of website information</h2>
          <p>We strive to keep the information on this Website accurate and up to date. However, we do not warrant that all content is error-free, complete, or current at all times. Service descriptions, capabilities, and examples are indicative and may not reflect the exact scope of any individual engagement. Always confirm details in writing before relying on them for business decisions.</p>
        </section>

        <section>
          <h2>4. Service descriptions and project scope</h2>
          <p>The services described on this Website (Lead Management Systems, WhatsApp Business Automation, Business Process Automation, Conversion-Focused Websites, Custom Business Software, Business Content & Creative Systems) represent our core offerings. The exact scope, deliverables, timelines, and pricing for any project are defined in a separate written proposal or agreement (<strong>&ldquo;Project Agreement&rdquo;</strong>). Website content does not constitute an offer capable of acceptance; it is an invitation to discuss your requirements.</p>
        </section>

        <section>
          <h2>5. Enquiry submission does not create a contract</h2>
          <p>Submitting an enquiry through our contact form or contacting us by email, phone, or WhatsApp does not create a client relationship, contract, or obligation to provide services. A formal engagement begins only when both parties sign a Project Agreement or equivalent written contract.</p>
        </section>

        <section>
          <h2>6. Proposals, quotations and pricing</h2>
          <ul>
            <li>Final pricing is communicated through an individual proposal or Project Agreement based on your specific requirements.</li>
            <li>Pricing may depend on project scope, complexity, timeline, third-party integrations, and ongoing support needs.</li>
            <li>Quotations are valid for the period stated therein (typically 30 days) unless otherwise agreed.</li>
            <li>We do not publish fixed price lists; every engagement is scoped individually.</li>
          </ul>
        </section>

        <section>
          <h2>7. Client responsibilities</h2>
          <p>For a project to succeed, the client agrees to:</p>
          <ul>
            <li>Provide accurate, complete, and timely information about requirements, users, and business processes.</li>
            <li>Supply required content, assets (logos, images, copy), brand guidelines, and approvals within agreed timelines.</li>
            <li>Provide necessary third-party account access (e.g., domain registrar, hosting, WhatsApp Business API, payment gateways) where applicable, or authorize us to set up accounts on your behalf.</li>
            <li>Designate a primary point of contact for decisions and feedback.</li>
            <li>Review and respond to deliverables, prototypes, and test builds promptly to avoid delays.</li>
          </ul>
        </section>

        <section>
          <h2>8. Project delivery</h2>
          <ul>
            <li>Timelines, milestones, and deliverables are agreed individually in the Project Agreement.</li>
            <li>We use a structured process (Discovery, Strategy, Design, Development, Testing, Launch, Support) but adapt it to each project&apos;s needs.</li>
            <li>Changes to scope after agreement may require a change order and can affect timeline and cost.</li>
            <li>Launch dates are targets, not guarantees; dependencies on third parties (app stores, domain propagation, API approvals) may cause delays.</li>
          </ul>
        </section>

        <section>
          <h2>9. Payments</h2>
          <ul>
            <li>Payment terms (deposit, milestones, final payment) are defined in the Project Agreement.</li>
            <li>Late payments may incur interest at the rate permitted by applicable law and can pause work until resolved.</li>
            <li>We do not offer refunds for work completed; cancellation terms are specified in the Project Agreement.</li>
            <li>No refund or payment promises are made on this Website.</li>
          </ul>
        </section>

        <section>
          <h2>10. Intellectual property</h2>
          <ul>
            <li><strong>Company-owned materials:</strong> Our proprietary frameworks, code libraries, design systems, methodologies, and internal tools remain our property.</li>
            <li><strong>Third-party assets:</strong> Licensed fonts, stock media, open-source libraries, and platform APIs are governed by their respective licenses.</li>
            <li><strong>Client-owned deliverables:</strong> Final project deliverables (custom code, designs, content) created specifically for you under a Project Agreement are typically assigned to you upon full payment, subject to the agreement&apos;s terms.</li>
            <li><strong>Pre-existing IP:</strong> Each party retains ownership of its pre-existing intellectual property.</li>
            <li>Final ownership and licensing depend on the signed Project Agreement.</li>
          </ul>
        </section>

        <section>
          <h2>11. Third-party services</h2>
          <p>Our solutions may integrate with or depend on third-party platforms (e.g., WhatsApp Business API, payment gateways, cloud hosting, analytics). These services have their own terms, availability, pricing, and uptime guarantees. We are not responsible for third-party service outages, policy changes, or termination. You are responsible for maintaining your accounts and compliance with third-party terms.</p>
        </section>

        <section>
          <h2>12. Website availability</h2>
          <p>We aim to keep the Website accessible but do not guarantee uninterrupted, error-free, or secure access. Maintenance, upgrades, or force majeure events may cause temporary unavailability. We are not liable for losses arising from Website downtime.</p>
        </section>

        <section>
          <h2>13. Limitation of liability</h2>
          <p>To the maximum extent permitted by applicable law:</p>
          <ul>
            <li>Our aggregate liability for any claims arising from or related to the Website, services, or these Terms shall not exceed the total fees paid by you under the relevant Project Agreement (or INR 1,00,000 if no fees have been paid).</li>
            <li>We are not liable for indirect, incidental, consequential, special, or punitive damages, including loss of profits, data, business opportunities, or goodwill.</li>
            <li>We do not exclude liability for death or personal injury caused by our negligence, fraud, or any liability that cannot legally be excluded under applicable law.</li>
          </ul>
        </section>

        <section>
          <h2>14. Prohibited website use</h2>
          <p>You agree not to use the Website to:</p>
          <ul>
            <li>Transmit spam, unsolicited communications, or fraudulent enquiries.</li>
            <li>Impersonate any person or entity or misrepresent your affiliation.</li>
            <li>Collect or harvest personal data of others without consent.</li>
            <li>Engage in any activity that could damage, disable, or impair the Website.</li>
          </ul>
        </section>

        <section>
          <h2>15. Changes to these terms</h2>
          <p>We may update these Terms from time to time. The effective date at the top of this page will reflect the most recent revision. Continued use of the Website after changes constitutes acceptance. Material changes will be highlighted on the Website.</p>
        </section>

        <section>
          <h2>16. Governing law and jurisdiction</h2>
          <p>These Terms are governed by the laws of <strong>{governingLaw}</strong>. Any dispute arising from or related to these Terms or the Website shall be subject to the exclusive jurisdiction of the courts in <strong>{jurisdiction}</strong>, subject to applicable law.</p>
          <p>Registered office: {registeredOffice}</p>
        </section>

        <section>
          <h2>17. Contact details</h2>
          <p>For questions about these Terms, contact:</p>
          <ul>
            <li>Email: <a href={`mailto:${legalContactEmail}`}>{legalContactEmail}</a></li>
            <li>Company: {companyName}</li>
          </ul>
        </section>

        <div className="legal-edit-callout">
          <p className="mono-label">BEFORE GO-LIVE</p>
          <p>Confirm all bracketed placeholders: governing law, jurisdiction, registered office address, effective date. Have these Terms reviewed by a qualified legal professional familiar with Indian contract law, the Information Technology Act, 2000, the Digital Personal Data Protection Act, 2023, and applicable consumer protection laws before publication. Do not rely on this draft as final legal advice.</p>
        </div>
      </article>
    </main>
  );
}