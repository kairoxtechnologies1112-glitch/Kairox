import Link from 'next/link';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { BrandMark } from '@/components/BrandMark';
import { companyDescriptor, companyName, contactConfig } from '@/lib/site';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-top wrap">
        <div className="footer-pitch">
          <p className="eyebrow"><span className="eyebrow-mark" />Have a good one in mind?</p>
          <h2>Let&apos;s make it<br /><span>work better.</span></h2>
          <Link href="/contact" className="footer-cta">Start a conversation <ArrowUpRight size={17} /></Link>
        </div>
        <div className="footer-nav-block">
          <div><p className="footer-label">Explore</p><Link href="/services">Services</Link><Link href="/work">Our work</Link><Link href="/about">About us</Link><Link href="/process">Our process</Link></div>
          <div><p className="footer-label">Information</p><Link href="/contact">Contact</Link><Link href="/privacy">Privacy policy</Link><Link href="/terms">Terms & conditions</Link></div>
        </div>
      </div>
      <div className="footer-bottom wrap">
        <Link href="/" className="footer-brand" aria-label={`${companyName}, home`}><BrandMark /><span>{companyName}</span></Link>
        <div className="footer-contact">
          <a href={`mailto:${contactConfig.email}`} className="footer-contact-item">
            <Mail size={14} />
            <span>{contactConfig.email}</span>
          </a>
          {contactConfig.phones.map((phone, index) => (
            <a key={index} href={`tel:${phone.digitsOnly}`} className="footer-contact-item">
              <Phone size={14} />
              <span>{phone.number}</span>
            </a>
          ))}
        </div>
        <p>© {year} {companyName}. All rights reserved.</p>
        <p className="footer-tagline">{companyDescriptor}</p>
      </div>
    </footer>
  );
}