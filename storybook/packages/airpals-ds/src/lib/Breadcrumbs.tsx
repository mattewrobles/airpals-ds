import React from 'react';

export type BreadcrumbSeparator = 'slash' | 'chevron' | 'arrow';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  separator?: BreadcrumbSeparator;
  showHomeIcon?: boolean;
  coloredBg?: boolean;
};

const HOME_ICON = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M1.167 5.833L7 1.167l5.833 4.666V12.25a.583.583 0 01-.583.583H9.333a.583.583 0 01-.583-.583V9.333H5.25v2.917a.583.583 0 01-.583.583H1.75a.583.583 0 01-.583-.583V5.833z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SEPARATORS: Record<BreadcrumbSeparator, string> = {
  slash: '/', chevron: '›', arrow: '→',
};

export function Breadcrumbs({ items, separator = 'slash', showHomeIcon = false, coloredBg = false }: BreadcrumbsProps) {
  const sep = SEPARATORS[separator];
  const wrapClass = coloredBg
    ? 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#e6f1fd]'
    : 'inline-flex items-center gap-1.5';

  return (
    <nav aria-label="Breadcrumb" className="font-body">
      <ol className={wrapClass}>
        {showHomeIcon && (
          <>
            <li>
              <a href="#" className="text-slate-400 hover:text-[#1b306c] transition-colors" aria-label="Home">{HOME_ICON}</a>
            </li>
            {items.length > 0 && <li aria-hidden="true" className="text-slate-300 text-sm select-none">{sep}</li>}
          </>
        )}
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <React.Fragment key={i}>
              <li>
                {isLast ? (
                  <span className="text-sm font-medium text-[#1b306c]" aria-current="page">{item.label}</span>
                ) : (
                  <a href={item.href ?? '#'} className="text-sm text-slate-500 hover:text-[#1b306c] transition-colors">{item.label}</a>
                )}
              </li>
              {!isLast && <li aria-hidden="true" className="text-slate-300 text-sm select-none">{sep}</li>}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
