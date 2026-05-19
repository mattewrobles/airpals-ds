import React, { useState } from 'react';

type Tab = 'html' | 'jsx';

type CodeBlockProps = {
  /** HTML + Tailwind snippet */
  code: string;
  /** React JSX snippet — when provided, shows HTML / JSX tabs */
  jsx?: string;
};

export function CodeBlock({ code, jsx }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<Tab>('html');
  const hasTabs = !!jsx;
  const activeCode = hasTabs && tab === 'jsx' ? jsx : code;

  const copy = () => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        {hasTabs ? (
          <div className="flex items-center gap-1">
            {(['html', 'jsx'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={[
                  'px-2 py-0.5 text-xs rounded font-mono transition-colors',
                  tab === t
                    ? 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300',
                ].join(' ')}
              >
                {t === 'html' ? 'HTML' : 'JSX'}
              </button>
            ))}
          </div>
        ) : (
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">HTML + Tailwind</span>
        )}
        <button
          onClick={copy}
          className="px-2 py-1 text-xs rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors font-mono"
        >
          {copied ? '✓ copied' : 'copy'}
        </button>
      </div>
      <pre className="px-4 py-3 text-xs font-mono text-slate-700 dark:text-slate-300 overflow-x-auto bg-white dark:bg-slate-900 leading-relaxed">
        {activeCode}
      </pre>
    </div>
  );
}
