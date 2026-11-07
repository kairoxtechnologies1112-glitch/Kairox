'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { BrandMark } from '@/components/BrandMark';
import { companyDescriptor, companyName } from '@/lib/site';

const links = [
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Our work' },
  { href: '/about', label: 'About' },
  { href: '/process', label: 'Process' },
];

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuButton = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label={`${companyName}, home`} onClick={close}>
          <BrandMark />
          <span className="brand-copy"><strong>{companyName}</strong><small>{companyDescriptor}</small></span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => {
            const current = isCurrent(pathname, link.href);
            return <Link href={link.href} key={link.href} aria-current={current ? 'page' : undefined} className={current ? 'is-current' : undefined}>{link.label}</Link>;
          })}
        </nav>

        <Link className="button button--small button--outline header-cta" href="/contact" aria-current={isCurrent(pathname, '/contact') ? 'page' : undefined}>
          Start a project <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
        <button ref={menuButton} className="menu-toggle" type="button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
          {open ? <X size={23} aria-hidden="true" /> : <Menu size={23} aria-hidden="true" />}
        </button>
      </div>

      <nav id="mobile-navigation" className={`mobile-nav${open ? ' is-open' : ''}`} aria-label="Mobile navigation" aria-hidden={!open} inert={!open}>
        {links.map((link) => {
          const current = isCurrent(pathname, link.href);
          return <Link href={link.href} key={link.href} onClick={close} aria-current={current ? 'page' : undefined} className={current ? 'is-current' : undefined}>{link.label}<ArrowUpRight size={16} aria-hidden="true" /></Link>;
        })}
        <Link href="/contact" onClick={close} className="mobile-nav__cta" aria-current={isCurrent(pathname, '/contact') ? 'page' : undefined}>Start a project <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </nav>
    </header>
  );
}
