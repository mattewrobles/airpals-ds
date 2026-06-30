"use client";

import React, { useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/solid';
import { Logo } from './Logo';

// Figma 747-9228 (desktop) / 747-9226 (mobile)
// bg: #1b306c (background/accent-contrast)
// Desktop: pt-80 px-80 pb-48, max-w inner 1280px
// Mobile: px-24 py-40 gap-32, w-390

export type FooterBlogEntry = {
  title: string;
  imageUrl?: string;
};

export type FooterProps = {
  mobile?: boolean;
  blogEntries?: FooterBlogEntry[];
  soc2BadgeUrl?: string;
  className?: string;
};

// ─── Social icons ────────────────────────────────────────────────────────────

const FacebookIcon = () => (
  <svg width="21" height="20" viewBox="0 0 21 20" fill="none" aria-hidden="true">
    <path d="M20.5 10C20.5 4.477 16.023 0 10.5 0S.5 4.477.5 10c0 4.991 3.657 9.128 8.438 9.878V12.89H6.398V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.843 19.128 20.5 14.991 20.5 10z" fill="white" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 1.802c2.67 0 2.986.01 4.04.059 2.71.123 3.976 1.409 4.1 4.099.048 1.054.057 1.37.057 4.04 0 2.672-.01 2.988-.058 4.042-.124 2.687-1.386 3.975-4.099 4.099-1.055.048-1.37.058-4.04.058-2.67 0-2.987-.01-4.04-.058-2.718-.124-3.976-1.416-4.1-4.1C1.812 12.988 1.8 12.672 1.8 10c0-2.67.01-2.986.059-4.04.125-2.69 1.386-3.975 4.099-4.099 1.054-.048 1.37-.059 4.042-.059zm0-1.802C7.284 0 6.944.012 5.878.06 2.246.227.228 2.242.061 5.877.012 6.944 0 7.284 0 10c0 2.716.012 3.057.06 4.122.167 3.632 2.182 5.65 5.817 5.817C6.944 19.988 7.284 20 10 20c2.716 0 3.057-.012 4.122-.06 3.629-.167 5.652-2.182 5.817-5.817C19.988 13.057 20 12.716 20 10c0-2.716-.012-3.056-.06-4.122C19.777 2.249 17.76.228 14.122.06 13.057.012 12.716 0 10 0zm0 4.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" fill="white" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M18.52 0H1.477C.66 0 0 .645 0 1.44v17.12C0 19.356.66 20 1.477 20H18.52C19.34 20 20 19.355 20 18.56V1.44C20 .645 19.34 0 18.52 0zM5.937 17.043H2.965V7.497H5.94v9.546h-.003zM4.45 6.193a1.72 1.72 0 110-3.44 1.72 1.72 0 010 3.44zm12.594 10.85h-2.97v-4.64c0-1.107-.02-2.53-1.542-2.53-1.543 0-1.779 1.204-1.779 2.449v4.72H7.784V7.497h2.849v1.303h.04c.396-.75 1.365-1.542 2.809-1.542 3.005 0 3.561 1.978 3.561 4.547v5.238z" fill="white" />
  </svg>
);

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_BLOG_ENTRIES: FooterBlogEntry[] = [
  { title: 'USPS vs UPS vs FedEx: Which is Best in 2025?' },
  { title: 'How to Get Discounted Shipping Rates' },
];

const LINKS_COL1 = [
  'About Us', 'For Companies', 'Pricing',
  'NYC Same Day Same City', 'Multi-carrier Shipping Software', 'Shipping Cost Calculator',
];
const LINKS_COL2 = ['How It Works', 'Share Your Feedback', 'Help Center', 'Contact Us', 'Blog'];
const LINKS_COL3 = ['Sitemap', 'Privacy Policy', 'Terms & Conditions', 'T&C Multi-carrier', 'T&C NYC Same-day'];

// ─── Sub-components ──────────────────────────────────────────────────────────

const linkStyle: React.CSSProperties = {
  fontSize: 14, fontWeight: 500, fontFamily: 'Inter',
  color: '#ffffff', lineHeight: '20px', textDecoration: 'none', cursor: 'pointer',
};

const SocialIcons = () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
    <a href="#" aria-label="Facebook" style={{ display: 'flex', flexShrink: 0 }}><FacebookIcon /></a>
    <a href="#" aria-label="Instagram" style={{ display: 'flex', flexShrink: 0 }}><InstagramIcon /></a>
    <a href="#" aria-label="LinkedIn" style={{ display: 'flex', flexShrink: 0 }}><LinkedInIcon /></a>
  </div>
);

function NewsletterForm({ fullWidthFields = false }: { fullWidthFields?: boolean }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const fieldBase: React.CSSProperties = {
    height: 45, display: 'flex', alignItems: 'center',
    borderBottom: '2px solid #ffffff', padding: '9px 13px', overflow: 'hidden',
  };
  const inputBase: React.CSSProperties = {
    flex: 1, border: 'none', outline: 'none', background: 'transparent',
    fontSize: 16, fontWeight: 400, fontFamily: 'Inter',
    color: '#ffffff', lineHeight: '20px', padding: 0, minWidth: 0,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
      <span style={{ fontSize: 18, fontWeight: 600, fontFamily: 'Lexend', color: '#ffffff', lineHeight: 'normal' }}>
        Subscribe to our newsletter
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, width: '100%' }}>
        {/* First + Last Name row */}
        <div style={{ display: 'flex', flexDirection: fullWidthFields ? 'column' : 'row', gap: fullWidthFields ? 9 : 16, width: '100%' }}>
          <div style={{ ...fieldBase, flex: fullWidthFields ? undefined : 1 }}>
            <input
              type="text" placeholder="First Name" value={firstName}
              onChange={e => setFirstName(e.target.value)}
              style={{ ...inputBase, width: fullWidthFields ? '100%' : undefined }}
            />
          </div>
          <div style={{ ...fieldBase, flex: fullWidthFields ? undefined : 1 }}>
            <input
              type="text" placeholder="Last Name" value={lastName}
              onChange={e => setLastName(e.target.value)}
              style={{ ...inputBase, width: fullWidthFields ? '100%' : undefined }}
            />
          </div>
        </div>
        {/* Email */}
        <div style={{ ...fieldBase, width: '100%' }}>
          <input
            type="email" placeholder="Type your e-mail" value={email}
            onChange={e => setEmail(e.target.value)}
            style={inputBase}
          />
        </div>
        {/* Submit — right-aligned, no bg */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 4 }}>
          <button
            type="submit"
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 12, borderRadius: 6,
              fontSize: 14, fontWeight: 600, fontFamily: 'Inter', color: '#ffffff',
            }}
          >
            Submit
            <ArrowRightIcon style={{ width: 18, height: 18, flexShrink: 0 }} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

function BlogCard({ title, imageUrl, stack = false }: { title: string; imageUrl?: string; stack?: boolean }) {
  return (
    <div style={{
      display: 'flex', gap: 16, alignItems: 'center',
      backgroundColor: 'rgba(218,227,236,0.15)',
      borderRadius: 8, padding: 8,
      flex: stack ? undefined : '1 0 0',
      width: stack ? '100%' : undefined,
    }}>
      {/* Thumbnail */}
      {imageUrl ? (
        <img
          src={imageUrl} alt=""
          style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }}
        />
      ) : (
        <div style={{ width: 44, height: 44, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />
      )}
      <span style={{ flex: 1, fontSize: 14, fontWeight: 500, fontFamily: 'Inter', color: '#ffffff', lineHeight: '20px', minWidth: 0 }}>
        {title}
      </span>
    </div>
  );
}

function TrustBar({ compact = false, soc2BadgeUrl }: { compact?: boolean; soc2BadgeUrl?: string }) {
  const badgeSize = compact ? 58 : 78;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 31, justifyContent: compact ? 'space-between' : 'center', width: '100%', padding: '16px 0' }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        {soc2BadgeUrl ? (
          <img src={soc2BadgeUrl} alt="SOC 2 Type II" style={{ width: badgeSize, height: badgeSize, borderRadius: 9999, flexShrink: 0, objectFit: 'cover' }} />
        ) : (
          <div style={{
            width: badgeSize, height: badgeSize, borderRadius: 9999, flexShrink: 0,
            border: '2px solid rgba(255,255,255,0.4)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.08)',
          }}>
            <span style={{ fontSize: 9, fontWeight: 700, fontFamily: 'Inter', color: '#ffffff', textAlign: 'center', lineHeight: 1.2 }}>AICPA{'\n'}SOC</span>
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 600, fontFamily: 'Inter', color: '#ffffff', lineHeight: 'normal' }}>SOC 2 Type II</span>
          <span style={{ fontSize: 12, fontWeight: 400, fontFamily: 'Inter', color: 'rgba(255,255,255,0.45)', lineHeight: 'normal' }}>AICPA Certified</span>
        </div>
      </div>
      <div style={{ width: 1, height: 36, backgroundColor: 'rgba(255,255,255,0.18)', flexShrink: 0 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontSize: 14, fontWeight: 600, fontFamily: 'Inter', color: '#ffffff', lineHeight: 'normal' }}>256-bit SSL</span>
        <span style={{ fontSize: 12, fontWeight: 400, fontFamily: 'Inter', color: 'rgba(255,255,255,0.45)', lineHeight: 'normal' }}>End-to-end encrypted</span>
      </div>
    </div>
  );
}

function LinksColumn({ links, bold }: { links: string[]; bold?: Set<string> }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flexShrink: 0 }}>
      {links.map(link => (
        <a
          key={link} href="#"
          style={{
            ...linkStyle,
            fontWeight: bold?.has(link) ? 700 : 500,
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          {link}
        </a>
      ))}
    </div>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

export function Footer({ mobile = false, blogEntries = DEFAULT_BLOG_ENTRIES, soc2BadgeUrl, className = '' }: FooterProps) {
  const bg: React.CSSProperties = { backgroundColor: '#1b306c', fontFamily: 'Inter' };
  const boldLinks = new Set(['Terms & Conditions']);

  if (mobile) {
    return (
      <footer style={{ ...bg, width: 390, padding: '40px 24px', display: 'flex', flexDirection: 'column', gap: 32, boxSizing: 'border-box' }} className={className}>
        <Logo color="white" height={30} />
        <NewsletterForm fullWidthFields />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {blogEntries.map((e, i) => <BlogCard key={i} title={e.title} imageUrl={e.imageUrl} stack />)}
        </div>
        {/* Links — 3 columns stacked, centered */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center', textAlign: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
            {[...LINKS_COL1, ...LINKS_COL2, ...LINKS_COL3].map(link => (
              <a key={link} href="#" style={{ ...linkStyle, fontWeight: boldLinks.has(link) ? 700 : 500 }}>
                {link}
              </a>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <SocialIcons />
        </div>
        <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.12)', width: '100%' }} />
        <TrustBar compact soc2BadgeUrl={soc2BadgeUrl} />
      </footer>
    );
  }

  return (
    <footer style={{ ...bg, width: '100%', boxSizing: 'border-box' }} className={className}>
      {/* Main content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 80px 0', display: 'flex', flexDirection: 'column', gap: 64, boxSizing: 'border-box' }}>
        {/* Header row: logo + social */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <Logo color="white" height={31} />
          <SocialIcons />
        </div>

        {/* Navigation: newsletter+blog | links */}
        <div style={{ display: 'flex', gap: 120, alignItems: 'flex-start', width: '100%' }}>
          {/* Left: newsletter + blog */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <NewsletterForm />
            <div style={{ display: 'flex', gap: 25 }}>
              {blogEntries.slice(0, 2).map((e, i) => <BlogCard key={i} title={e.title} imageUrl={e.imageUrl} />)}
            </div>
          </div>

          {/* Right: 3 link columns */}
          <div style={{ width: 640, display: 'flex', gap: 64, alignItems: 'flex-start', flexShrink: 0 }}>
            <LinksColumn links={LINKS_COL1} bold={boldLinks} />
            <LinksColumn links={LINKS_COL2} bold={boldLinks} />
            <LinksColumn links={LINKS_COL3} bold={boldLinks} />
          </div>
        </div>
      </div>

      {/* Divider + Trust bar — inside same maxWidth container for alignment */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 80px', boxSizing: 'border-box' }}>
        <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.12)', width: '100%', marginTop: 48 }} />
        <TrustBar soc2BadgeUrl={soc2BadgeUrl} />
        <div style={{ height: 48 }} />
      </div>
    </footer>
  );
}
