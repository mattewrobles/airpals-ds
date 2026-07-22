import React, { useState } from 'react';

const PKG = 'airpals-ds';
const VERSION = '0.5.0';
const NPM_URL = 'https://www.npmjs.com/package/airpals-ds';

type UsageBlockProps = {
  /** Component name(s) to import, e.g. 'Button' or ['RadioIndicator', 'RadioButton'] */
  component: string | string[];
  /** Type names to import (optional) */
  types?: string[];
  /** JSX usage snippet */
  jsx: string;
  /** Figma component key (optional) */
  figmaKey?: string;
};

function CopyButton({ value, label = 'copy' }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      }}
      className="px-2 py-0.5 text-xs rounded font-mono bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors flex-shrink-0"
    >
      {copied ? '✓' : label}
    </button>
  );
}

function Row({ label, code, copyValue }: { label: string; code: string; copyValue: string }) {
  return (
    <div className="border-t border-slate-100">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-50">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">{label}</span>
        <CopyButton value={copyValue} />
      </div>
      <pre className="px-4 py-2.5 text-xs font-mono text-slate-700 leading-relaxed overflow-x-auto bg-white whitespace-pre-wrap">
        {code}
      </pre>
    </div>
  );
}

export function UsageBlock({ component, types, jsx, figmaKey }: UsageBlockProps) {
  const names = Array.isArray(component) ? component : [component];
  const installCmd = `yarn add ${PKG}`;

  const importLine = `import { ${names.join(', ')} } from '${PKG}';`;
  const typesLine = types?.length
    ? `import type { ${types.join(', ')} } from '${PKG}';`
    : null;
  const importFull = typesLine ? `${importLine}\n${typesLine}` : importLine;

  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden font-body mb-6">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-[#1b306c]">{PKG}</span>
          <span className="px-1.5 py-0.5 text-[10px] font-mono rounded-full bg-[#e6f1fd] text-[#0043ff] font-medium">
            v{VERSION}
          </span>
        </div>
        <a
          href={NPM_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-[#0043ff] transition-colors"
        >
          npm
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      {/* Install */}
      <Row label="Install" code={installCmd} copyValue={installCmd} />

      {/* Import */}
      <Row label="Import" code={importFull} copyValue={importFull} />

      {/* Usage */}
      <div className="border-t border-slate-100">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-50">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Usage</span>
          <CopyButton value={jsx} />
        </div>
        <pre className="px-4 py-2.5 text-xs font-mono text-[#0043ff] leading-relaxed overflow-x-auto bg-white whitespace-pre-wrap">
          {jsx}
        </pre>
      </div>

      {/* Figma key (optional) */}
      {figmaKey && (
        <div className="border-t border-slate-100 flex items-center justify-between px-4 py-2 bg-white">
          <span className="text-xs text-slate-400">Figma key</span>
          <div className="flex items-center gap-2">
            <code className="font-mono text-[10px] text-slate-400 truncate max-w-[260px]">{figmaKey}</code>
            <CopyButton value={`await figma.importComponentByKeyAsync('${figmaKey}')`} label="copy import" />
          </div>
        </div>
      )}
    </div>
  );
}
