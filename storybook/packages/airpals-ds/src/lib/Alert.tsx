import React from 'react';

export type AlertType = 'Error' | 'Warning';

export type AlertProps = {
  type?: AlertType;
  title: string;
  items?: string[];
};

const alertConfig = {
  Error: {
    bg: 'bg-[#fef2f2]',
    iconColor: 'text-[#f87171]',
    titleColor: 'text-[#991b1b]',
    icon: (
      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
      </svg>
    ),
  },
  Warning: {
    bg: 'bg-[#fffbeb]',
    iconColor: 'text-[#fbbf24]',
    titleColor: 'text-[#92400e]',
    icon: (
      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
      </svg>
    ),
  },
};

export function Alert({ type = 'Error', title, items }: AlertProps) {
  const cfg = alertConfig[type];
  return (
    <div className={`flex gap-3 ${cfg.bg} rounded-[6px] p-4`}>
      <span className={cfg.iconColor}>{cfg.icon}</span>
      <div className="flex flex-col gap-2 min-w-0">
        <p className={`text-sm ${items?.length ? 'font-medium' : 'font-normal'} ${cfg.titleColor} leading-5`}>{title}</p>
        {items && items.length > 0 && (
          <ul className="flex flex-col gap-1">
            {items.map((item, i) => (
              <li key={i} className="text-sm text-[#374151] leading-5 list-disc ml-4">{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
