import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { pageMetadata } from '@/lib/metadata';
import { companyName, contactConfig } from '@/lib/site';

export const metadata = pageMetadata('Privacy Policy', 'How KAIROX Technologies collects, uses and protects your information when you visit our website or submit an enquiry.', '/privacy');

export default function PrivacyPage() {
  const effectiveDate = 'July 2025'; // Update before launch
  const privacyContactEmail = contactConfig.email;

  return (
    <main id="main" className="inner-page legal-page">
      <section className="legal-hero wrap">
        <Link href="/" className="back-link"><ArrowLeft size={15} /> Home</Link>
        <p className="eyebrow"><span className="eyebrow-mark" />Information / Privacy</p>
        <h1>Privacy<br /><span>policy.</span></h1>
        <p className="legal-notice">Effective date: {effectiveDate}. This policy describes our current practices. Review before publication.</p>
      </section>
      <article className="legal-content wrap">
        <section>
          <h2>1. Introduction and company identity</h2>
          <p><strong>{companyName}</strong> (<strong>{'"we", "us", "our"'}</strong>) operates this website. We are committed to protecting your personal information and being transparent about how we handle it. This Privacy Policy explains what information we collect, why we collect it, how we use it, and your rights regarding your data.</p>
          <p>If you have questions about this policy or our data practices, contact us at <a href={`mailto:${privacyContactEmail}`}>{privacyContactEmail}</a>.</p>
        </section>

        <section>
          <h2>2. Information we collect</h2>
          <p>We collect the following categories of personal information when you interact with our website:</p>
          <ul>
            <li><strong>Name</strong> &mdash; provided when you submit an enquiry form.</li>
            <li><strong>Email address</strong> &mdash; provided when you submit an enquiry form.</li>
            <li><strong>Phone number</strong> &mdash; if you choose to provide it in the enquiry form.</li>
            <li><strong>Company or business details</strong> &mdash; if you provide them in the enquiry form.</li>
            <li><strong>Enquiry message</strong> &mdash; the content of your project enquiry or message.</li>
            <li><strong>Technical information</strong> &mdash; IP address, browser type, device information, operating system, referring URL, pages visited, and timestamps, collected automatically when you visit our website.</li>
          </ul>
        </section>

        <section>
          <h2>3. How we collect information</h2>
          <ul>
            <li><strong>Contact and enquiry forms</strong> &mdash; information you voluntarily submit.</li>
            <li><strong>Website interactions</strong> &mdash; technical data collected automatically via server logs and analytics.</li>
            <li><strong>Cookies and similar technologies</strong> &mdash; see Section 9 for details on what we actually use.</li>
          </ul>
        </section>

        <section>
          <h2>4. Why we collect and use your information</h2>
          <p>We use your information for the following purposes:</p>
          <ul>
            <li><strong>Responding to enquiries</strong> &mdash; to communicate with you about your project request.</li>
            <li><strong>Communicating about requested services</strong> &mdash; to provide information, proposals, or follow-up related to your enquiry.</li>
            <li><strong>Preparing proposals</strong> &mdash; to understand your requirements and prepare relevant service proposals.</li>
            <li><strong>Providing requested services</strong> &mdash; if you engage us, to deliver the agreed services.</li>
            <li><strong>Website security and improvement</strong> &mdash; to monitor for abuse, debug issues, and improve the website experience.</li>
            <li><strong>Legal compliance</strong> &mdash; to meet legal obligations and respond to lawful requests.</li>
          </ul>
        </section>

        <section>
          <h2>5. Data sharing</h2>
          <p>We do not sell your personal information. We may share your information with the following categories of recipients where necessary:</p>
          <ul>
            <li><strong>Service providers</strong> &mdash; email delivery (Resend), hosting (Vercel or similar), analytics providers (if enabled), and other processors acting on our behalf under contractual obligations.</li>
            <li><strong>Legal authorities</strong> &mdash; when required by law, regulation, or legal process.</li>
            <li><strong>Business transfers</strong> &mdash; in connection with a merger, acquisition, or sale of assets, we may transfer your information as part of that transaction.</li>
          </ul>
          <p>We do not claim that no data is ever shared; third-party processors are used for essential website and email functionality.</p>
        </section>

        <section>
          <h2>6. Data storage and security</h2>
          <p>We implement reasonable technical and organizational measures to protect your information, including:</p>
          <ul>
            <li>HTTPS encryption for all website traffic.</li>
            <li>Server-side validation and sanitization of form submissions.</li>
            <li>Access controls on internal systems.</li>
            <li>Regular security updates to our technology stack.</li>
          </ul>
          <p>No method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security, but we take data protection seriously.</p>
        </section>

        <section>
          <h2>7. Data retention</h2>
          <p>We retain your information only as long as necessary for the purposes described in this policy:</p>
          <ul>
            <li><strong>Enquiry data</strong> &mdash; retained in our email system for as long as needed to respond and for legitimate business record-keeping, typically up to 2 years after last contact.</li>
            <li><strong>Technical logs</strong> &mdash; retained for up to 12 months for security and analytics.</li>
            <li><strong>Legal obligations</strong> &mdash; we may retain data longer where required by applicable law.</li>
          </ul>
        </section>

        <section>
          <h2>8. Your rights and requests</h2>
          <p>Subject to applicable law (including the Digital Personal Data Protection Act, 2023), you may have the right to:</p>
          <ul>
            <li>Request access to your personal information.</li>
            <li>Request correction of inaccurate or incomplete data.</li>
            <li>Request deletion of your data, where not overridden by legal retention requirements.</li>
            <li>Object to or restrict processing in certain circumstances.</li>
            <li>Request data portability where technically feasible.</li>
          </ul>
          <p>To exercise these rights, email us at <a href={`mailto:${privacyContactEmail}`}>{privacyContactEmail}</a>. We will respond within a reasonable timeframe as required by law. We may need to verify your identity before fulfilling requests.</p>
        </section>

        <section>
          <h2>9. Cookies and analytics</h2>
          <p>As of the effective date, this website:</p>
          <ul>
            <li>Uses <strong>essential cookies</strong> only for session management and form security (honeypot, CSRF protection).</li>
            <li>Does <strong>not</strong> use analytics cookies (Google Analytics, Matomo, etc.) unless explicitly enabled and disclosed here.</li>
            <li>Does <strong>not</strong> use advertising or tracking cookies.</li>
          </ul>
          <p>If analytics or other non-essential cookies are added in the future, this section will be updated and a consent mechanism will be implemented where required by law.</p>
        </section>

        <section>
          <h2>10. Third-party services and links</h2>
          <p>Our website may contain links to third-party websites (e.g., WhatsApp, LinkedIn). We are not responsible for the privacy practices of those sites. We encourage you to review their privacy policies.</p>
          <p>Third-party service providers we use (email, hosting) have their own privacy policies governing how they process data on our behalf.</p>
        </section>

        <section>
          <h2>11. Children&apos;s information</h2>
          <p>Our website is not directed to children under 18. We do not knowingly collect personal information from children without appropriate parental authorization where required by applicable law. If you believe a child has provided us with personal information, contact us and we will take steps to delete it.</p>
        </section>

        <section>
          <h2>12. Policy updates</h2>
          <p>We may update this Privacy Policy from time to time. The effective date at the top of this page will reflect the most recent revision. Material changes will be communicated via the website or, where appropriate, by email.</p>
        </section>

        <section>
          <h2>13. Contact details for privacy-related requests</h2>
          <p>For any questions, concerns, or requests regarding this Privacy Policy or your personal data, contact:</p>
          <ul>
            <li>Email: <a href={`mailto:${privacyContactEmail}`}>{privacyContactEmail}</a></li>
            <li>Company: {companyName}</li>
          </ul>
        </section>

        <div className="legal-edit-callout">
          <p className="mono-label">BEFORE GO-LIVE</p>
          <p>Confirm the effective date, privacy contact email, and any jurisdiction-specific details. Have this policy reviewed by a qualified legal professional familiar with the Digital Personal Data Protection Act, 2023 and applicable Indian law before publication.</p>
        </div>
      </article>
    </main>
  );
}