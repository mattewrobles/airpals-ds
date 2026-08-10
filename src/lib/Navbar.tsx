"use client";

import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown as LucideChevronDown,
  ChevronUp as LucideChevronUp,
  Search,
  Menu,
  X,
} from 'lucide-react';
import { Logo } from './Logo';
import { Button } from './Button';
import { Input } from './Input';
import { useIsMobile } from './hooks/useIsMobile';

// Figma 536-240 (full) + 536-190 (dropdown atom)
// Desktop: h-108px, px-32px, bg white
// Logo → nav links → search 187px → Log in / Talk to sales CTAs
// Dropdown: white bg, border #e2e8f0, rounded-6px, shadow-lg
// Mobile: header (logo + hamburger) + collapsible nav panel

export type NavbarProps = {
  mobile?: boolean;
  className?: string;
};

const ChevronDown = ({ className = '' }: { className?: string }) => (
  <LucideChevronDown className={`w-4 h-4 ${className}`} aria-hidden="true" />
);

const ChevronUp = () => (
  <LucideChevronUp className="w-4 h-4" aria-hidden="true" />
);

const HamburgerIcon = () => <Menu className="w-6 h-6" style={{ color: 'var(--color-text-primary)' }} aria-hidden="true" />;
const CloseIcon = () => <X className="w-6 h-6" style={{ color: 'var(--color-text-primary)' }} aria-hidden="true" />;

const SOLUTIONS_ITEMS = [
  'Multi-carrier Shipping Software',
  'NYC Same-day Courier',
];

function SolutionsDropdown({ open, mobile = false }: { open: boolean; mobile?: boolean }) {
  if (!open) return null;
  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        border: '1px solid var(--color-border-primary)',
        borderRadius: 6,
        boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)',
        ...(mobile ? { width: '100%' } : { position: 'absolute', top: 'calc(100% + 4px)', left: 0, minWidth: 260, zIndex: 50 }),
      }}
    >
      {SOLUTIONS_ITEMS.map((item, i) => (
        <a
          key={item}
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '11px 28px',
            fontSize: 14,
            fontWeight: 500,
            fontFamily: 'Inter',
            color: 'var(--color-text-primary)',
            borderTop: i === 0 ? '1px solid var(--color-border-primary)' : undefined,
            borderBottom: '1px solid var(--color-border-primary)',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            backgroundColor: 'var(--color-bg-primary)',
            transition: 'background-color var(--motion-fast) var(--ease-std)',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--color-bg-canvas)')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--color-bg-primary)')}
        >
          {item}
        </a>
      ))}
    </div>
  );
}

export function Navbar({ mobile: mobileProp = false, className = '' }: NavbarProps) {
  const isMobileScreen = useIsMobile();
  const mobile = mobileProp || isMobileScreen;
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (solutionsRef.current && !solutionsRef.current.contains(e.target as Node)) {
        setSolutionsOpen(false);
      }
      if (industriesRef.current && !industriesRef.current.contains(e.target as Node)) {
        setIndustriesOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navLinkStyle: React.CSSProperties = {
    fontSize: 14,
    fontWeight: 400,
    fontFamily: 'Inter',
    color: 'var(--color-text-primary)',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
    lineHeight: '20px',
  };

  const navLinkSemiboldStyle: React.CSSProperties = { ...navLinkStyle, fontWeight: 600 };

  if (mobile) {
    return (
      <nav className={className} style={{ backgroundColor: 'var(--color-bg-primary)', width: '100%' }}>
        {/* Mobile header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px' }}>
          <Logo color="original" height={30} />
          <button
            onClick={() => setMobileMenuOpen(v => !v)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>

        {/* Mobile nav panel */}
        {mobileMenuOpen && (
          <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Nav links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Solutions */}
              <div>
                <button
                  style={{ ...navLinkSemiboldStyle, display: 'flex', alignItems: 'center', gap: 0 }}
                  onClick={() => setSolutionsOpen(v => !v)}
                >
                  Solutions
                  <span style={{ marginLeft: 2, display: 'flex', alignItems: 'center' }}>
                    {solutionsOpen ? <ChevronUp /> : <ChevronDown />}
                  </span>
                </button>
                <div style={{ marginTop: solutionsOpen ? 12 : 0 }}>
                  <SolutionsDropdown open={solutionsOpen} mobile />
                </div>
              </div>

              {/* Industries */}
              <button
                style={{ ...navLinkStyle, display: 'flex', alignItems: 'center' }}
                onClick={() => setIndustriesOpen(v => !v)}
              >
                Industries
                <span style={{ marginLeft: 2, display: 'flex', alignItems: 'center' }}>
                  {industriesOpen ? <ChevronUp /> : <ChevronDown />}
                </span>
              </button>

              <a href="#" style={navLinkStyle}>Pricing</a>
              <a href="#" style={navLinkStyle}>About Us</a>
              <a href="#" style={navLinkStyle}>Contact Us</a>
              <a href="#" style={navLinkStyle}>Dashboard</a>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <Button variant="secondary" label="Log in / Dashboard" className="w-full" />
              <Button variant="accent-pink" label="Talk to sales" className="w-full" />
            </div>
          </div>
        )}
      </nav>
    );
  }

  // Desktop
  return (
    <nav
      className={className}
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        width: '100%',
        height: 108,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '32px',
        boxSizing: 'border-box',
        fontFamily: 'Inter',
      }}
    >
      {/* Logo */}
      <div style={{ flexShrink: 0 }}>
        <Logo color="original" height={30} />
      </div>

      {/* Nav links + search + CTAs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {/* Solutions */}
        <div ref={solutionsRef} style={{ position: 'relative' }}>
          <button
            style={{ ...navLinkSemiboldStyle, display: 'flex', alignItems: 'center' }}
            onClick={() => { setSolutionsOpen(v => !v); setIndustriesOpen(false); }}
          >
            Solutions
            <span style={{ marginLeft: 2, display: 'flex', alignItems: 'center', color: 'var(--color-text-primary)' }}>
              {solutionsOpen ? <ChevronUp /> : <ChevronDown />}
            </span>
          </button>
          <SolutionsDropdown open={solutionsOpen} />
        </div>

        {/* Industries */}
        <div ref={industriesRef} style={{ position: 'relative' }}>
          <button
            style={{ ...navLinkStyle, display: 'flex', alignItems: 'center' }}
            onClick={() => { setIndustriesOpen(v => !v); setSolutionsOpen(false); }}
          >
            Industries
            <span style={{ marginLeft: 2, display: 'flex', alignItems: 'center', color: 'var(--color-text-primary)' }}>
              {industriesOpen ? <ChevronUp /> : <ChevronDown />}
            </span>
          </button>
        </div>

        <a href="#" style={navLinkStyle}>Pricing</a>
        <a href="#" style={navLinkStyle}>About Us</a>
        <a href="#" style={navLinkStyle}>Contact Us</a>

        {/* Search input */}
        <Input
          placeholder="Search..."
          rightIcon={<Search style={{ width: 16, height: 16, color: 'var(--color-text-disable)' }} aria-hidden="true" />}
          aria-label="Search"
          className="w-[187px]"
        />

        {/* Log in / Dashboard */}
        <Button variant="secondary" label="Log in / Dashboard" className="whitespace-nowrap" />

        {/* Talk to sales */}
        <Button variant="accent-pink" label="Talk to sales" />
      </div>
    </nav>
  );
}
