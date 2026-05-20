import React from 'react';

export type FooterProps = {
  mobile?: boolean;
};

const COLUMNS = [
  { title: 'Company',  links: ['About Us', 'For Companies', 'Pricing'] },
  { title: 'Services', links: ['NYC Same-Day Delivery', 'Multi-Carrier Shipping', 'Shipping Cost Calculator'] },
  { title: 'Support',  links: ['How It Works', 'Help Center', 'Contact Us', 'Blog', 'Sitemap'] },
  { title: 'Legal',    links: ['Privacy Policy', 'Terms & Conditions', 'T&C Multi-carrier', 'T&C NYC Same-day'] },
];
const SOCIAL_ICONS = ['Twitter', 'LinkedIn', 'Instagram'];
const SOC2_SHIELD = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2L3 5.5v4.75C3 14.135 6.03 17.77 10 19c3.97-1.23 7-4.865 7-8.75V5.5L10 2z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
    <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const TRUST_ITEMS = [{ label: 'SOC 2 Type II' }, { label: 'AICPA Certified' }, { label: '256-bit SSL' }];

export function Footer({ mobile = false }: FooterProps) {
  if (mobile) {
    return (
      <footer className="font-body bg-[#1b306c] text-white w-[390px]">
        <div className="px-5 pt-8 pb-6 space-y-6">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xl" style={{ fontFamily: 'Lexend, sans-serif' }}>airpals</span>
            <div className="flex gap-3">
              {SOCIAL_ICONS.map(s => (
                <a key={s} href="#" aria-label={s} className="text-slate-400 hover:text-white transition-colors text-xs font-medium">{s[0]}</a>
              ))}
            </div>
          </div>
          {COLUMNS.map(col => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link}><a href="#" className="text-sm text-slate-300 hover:text-white transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Newsletter</h3>
            <div className="flex gap-2">
              <input type="email" placeholder="your@email.com" className="flex-1 px-3 py-2 rounded-lg text-sm bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:border-white/40" />
              <button className="px-3 py-2 bg-[#0043ff] text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 px-5 py-4 flex flex-wrap gap-3 items-center">
          {TRUST_ITEMS.map(({ label }) => (
            <div key={label} className="flex items-center gap-1.5 text-xs text-slate-400">
              <span className="text-slate-500">{SOC2_SHIELD}</span>{label}
            </div>
          ))}
        </div>
      </footer>
    );
  }

  return (
    <footer className="font-body bg-[#1b306c] text-white w-full">
      <div className="max-w-[1440px] mx-auto px-8 pt-12 pb-8">
        <div className="flex items-start justify-between mb-10">
          <div>
            <span className="font-bold text-2xl" style={{ fontFamily: 'Lexend, sans-serif' }}>airpals</span>
            <div className="flex gap-4 mt-3">
              {SOCIAL_ICONS.map(s => (
                <a key={s} href="#" aria-label={s} className="text-slate-400 hover:text-white transition-colors text-xs font-medium">{s}</a>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Newsletter</p>
            <div className="flex gap-2">
              <input type="email" placeholder="your@email.com" className="w-60 px-3 py-2 rounded-lg text-sm bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:border-white/40" />
              <button className="px-4 py-2 bg-[#0043ff] text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-8 pb-8 border-b border-white/10">
          {COLUMNS.map(col => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link}><a href="#" className="text-sm text-slate-300 hover:text-white transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 flex items-center gap-8">
          {TRUST_ITEMS.map(({ label }) => (
            <div key={label} className="flex items-center gap-2 text-xs text-slate-400">
              <span className="text-slate-500">{SOC2_SHIELD}</span>{label}
            </div>
          ))}
          <span className="ml-auto text-xs text-slate-500">© 2025 Airpals. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
