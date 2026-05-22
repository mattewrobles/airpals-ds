"use client";

import React, { useState } from 'react';
import { Logo } from './Logo';

export type NavbarProps = {
  mobile?: boolean;
  collapsed?: boolean;
};

const HAMBURGER = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const X_ICON = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const CHEVRON_DOWN = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="inline ml-0.5">
    <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const AIRPALS_LOGO = <Logo color="dark-blue" height={28} />;
const NAV_LINKS = ['Services', 'About Us', 'For Companies', 'Pricing', 'Contact Us'];

export function Navbar({ mobile = false, collapsed = false }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(!collapsed);

  if (mobile) {
    return (
      <nav className="font-body bg-white border-b border-slate-200 w-[390px]">
        <div className="flex items-center justify-between px-4 h-16">
          {AIRPALS_LOGO}
          <button onClick={() => setMenuOpen(v => !v)} className="text-[#1b306c] p-1" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
            {menuOpen ? X_ICON : HAMBURGER}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-slate-100 px-4 py-3 space-y-1">
            {NAV_LINKS.map(link => (
              <a key={link} href="#" className="flex items-center py-3 text-sm font-medium text-[#1b306c] hover:text-[#0043ff] border-b border-slate-100 last:border-0 transition-colors">
                {link}
                {link === 'Services' && <span className="ml-auto">{CHEVRON_DOWN}</span>}
              </a>
            ))}
            <div className="pt-3">
              <a href="#" className="flex items-center justify-center w-full bg-[#0043ff] text-white text-sm font-medium rounded-lg px-4 py-2.5 hover:bg-blue-700 transition-colors">
                Dashboard →
              </a>
            </div>
          </div>
        )}
      </nav>
    );
  }

  return (
    <nav className="font-body bg-white border-b border-slate-200 w-full">
      <div className="max-w-[1440px] mx-auto px-8 h-[108px] flex items-center justify-between gap-8">
        <div className="flex-shrink-0">{AIRPALS_LOGO}</div>
        <div className="flex items-center gap-6">
          {NAV_LINKS.map(link => (
            <a key={link} href="#" className="text-sm font-medium text-[#1b306c] hover:text-[#0043ff] whitespace-nowrap transition-colors">
              {link}{link === 'Services' && CHEVRON_DOWN}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button className="text-sm text-slate-500 hover:text-[#1b306c] transition-colors">Search...</button>
          <a href="#" className="bg-[#0043ff] text-white text-sm font-medium rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors whitespace-nowrap">
            Dashboard →
          </a>
        </div>
      </div>
    </nav>
  );
}