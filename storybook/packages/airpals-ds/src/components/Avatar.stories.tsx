import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">HTML + Tailwind</span>
        <button
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1400); }}
          className="px-2 py-1 text-xs rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors font-mono"
        >
          {copied ? '✓ copied' : 'copy'}
        </button>
      </div>
      <pre className="px-4 py-3 text-xs font-mono text-slate-700 dark:text-slate-300 overflow-x-auto bg-white dark:bg-slate-900 leading-relaxed">
        {code}
      </pre>
    </div>
  );
}

/* ── Component ───────────────────────────────────────────── */

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type AvatarShape = 'round' | 'square';
type AvatarType = 'image' | 'initials';

type AvatarProps = {
  size?: AvatarSize;
  shape?: AvatarShape;
  type?: AvatarType;
  initials?: string;
  src?: string;
  online?: boolean;
};

const sizeMap: Record<AvatarSize, { container: string; text: string; dot: string }> = {
  xs: { container: 'w-6 h-6',  text: 'text-[8px]', dot: 'w-2 h-2' },
  sm: { container: 'w-8 h-8',  text: 'text-xs',    dot: 'w-2.5 h-2.5' },
  md: { container: 'w-10 h-10', text: 'text-sm',   dot: 'w-2.5 h-2.5' },
  lg: { container: 'w-12 h-12', text: 'text-base', dot: 'w-3 h-3' },
  xl: { container: 'w-16 h-16', text: 'text-lg',   dot: 'w-3.5 h-3.5' },
};

function Avatar({
  size = 'md',
  shape = 'round',
  type = 'image',
  initials = 'AB',
  src = 'https://i.pravatar.cc/64',
  online = false,
}: AvatarProps) {
  const { container, text, dot } = sizeMap[size];
  const radius = shape === 'round' ? 'rounded-full' : 'rounded-md';

  return (
    <div className={`relative inline-flex shrink-0 ${container}`}>
      {type === 'image' ? (
        <img
          src={src}
          alt="avatar"
          className={`${container} ${radius} object-cover`}
        />
      ) : (
        <div className={`${container} ${radius} bg-brand-blue text-white font-semibold flex items-center justify-center ${text}`}>
          {initials.slice(0, 2).toUpperCase()}
        </div>
      )}
      {online && (
        <span className={`absolute bottom-0 right-0 ${dot} bg-green-500 rounded-full border-2 border-white`} />
      )}
    </div>
  );
}

type AvatarGroupProps = {
  count?: number;
  size?: AvatarSize;
  shape?: AvatarShape;
};

const GROUP_INITIALS = ['TG', 'MR', 'AB', 'KL', 'PD'];
const GROUP_SRCS = [
  'https://i.pravatar.cc/64?img=1',
  'https://i.pravatar.cc/64?img=2',
  'https://i.pravatar.cc/64?img=3',
  'https://i.pravatar.cc/64?img=4',
  'https://i.pravatar.cc/64?img=5',
];

function AvatarGroup({ count = 4, size = 'sm', shape = 'round' }: AvatarGroupProps) {
  const visible = Math.min(count, 5);
  return (
    <div className="flex -space-x-2">
      {Array.from({ length: visible }).map((_, i) => (
        <div key={i} className="ring-2 ring-white rounded-full">
          <Avatar
            size={size}
            shape={shape}
            type={i % 2 === 0 ? 'image' : 'initials'}
            src={GROUP_SRCS[i]}
            initials={GROUP_INITIALS[i]}
          />
        </div>
      ))}
    </div>
  );
}

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/QCicLCNGhyV9aJrUHZ6C44/Airpals---MVP-WIP?node-id=3672-29542';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size:     { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'], description: 'xs=24px · sm=32px · md=40px · lg=48px · xl=64px' },
    shape:    { control: 'select', options: ['round', 'square'], description: 'round = rounded-full · square = rounded-md' },
    type:     { control: 'select', options: ['image', 'initials'], description: 'image or initials fallback' },
    initials: { control: 'text', description: 'Max 2 chars — shown when type=initials' },
    src:      { control: 'text', description: 'Image URL — used when type=image' },
    online:   { control: 'boolean', description: 'Shows green presence dot bottom-right' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          'Airpals avatars in **image** and **initials** variants.',
          '',
          'Two shapes: **round** (rounded-full) and **square** (rounded-md).',
          '',
          'Five sizes: xs → xl. Online indicator scales with size.',
          '',
          'Use `AvatarGroup` for stacked user lists (team members, watchers).',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Avatar>;

/* ── Stories ─────────────────────────────────────────────── */

export const ImageRound: Story = {
  args: { type: 'image', shape: 'round', size: 'md', src: 'https://i.pravatar.cc/64' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<div class="relative inline-flex shrink-0 w-10 h-10">
  <img src="https://i.pravatar.cc/64" alt="avatar" class="w-10 h-10 rounded-full object-cover" />
</div>`,
      },
    },
  },
};

export const ImageSquare: Story = {
  args: { type: 'image', shape: 'square', size: 'md', src: 'https://i.pravatar.cc/64' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<div class="relative inline-flex shrink-0 w-10 h-10">
  <img src="https://i.pravatar.cc/64" alt="avatar" class="w-10 h-10 rounded-md object-cover" />
</div>`,
      },
    },
  },
};

export const InitialsRound: Story = {
  args: { type: 'initials', shape: 'round', size: 'md', initials: 'TG' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<div class="relative inline-flex shrink-0 w-10 h-10">
  <div class="w-10 h-10 rounded-full bg-brand-blue text-white font-semibold flex items-center justify-center text-sm">
    TG
  </div>
</div>`,
      },
    },
  },
};

export const InitialsSquare: Story = {
  args: { type: 'initials', shape: 'square', size: 'md', initials: 'MR' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<div class="relative inline-flex shrink-0 w-10 h-10">
  <div class="w-10 h-10 rounded-md bg-brand-blue text-white font-semibold flex items-center justify-center text-sm">
    MR
  </div>
</div>`,
      },
    },
  },
};

export const WithOnlineIndicator: Story = {
  name: 'With Online Indicator',
  args: { type: 'image', shape: 'round', size: 'md', src: 'https://i.pravatar.cc/64', online: true },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<div class="relative inline-flex shrink-0 w-10 h-10">
  <img src="https://i.pravatar.cc/64" alt="avatar" class="w-10 h-10 rounded-full object-cover" />
  <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
</div>`,
      },
    },
  },
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="bg-white dark:bg-slate-900 p-8 font-body space-y-8">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">Image — Round</p>
        <div className="flex items-end gap-4">
          {(['xs', 'sm', 'md', 'lg', 'xl'] as AvatarSize[]).map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <Avatar size={s} type="image" shape="round" src={`https://i.pravatar.cc/64?img=3`} />
              <span className="text-[10px] text-slate-400">{s}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">Initials — Square</p>
        <div className="flex items-end gap-4">
          {(['xs', 'sm', 'md', 'lg', 'xl'] as AvatarSize[]).map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <Avatar size={s} type="initials" shape="square" initials="TG" />
              <span className="text-[10px] text-slate-400">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- xs → xl sizes -->
<div class="relative inline-flex shrink-0 w-6 h-6"><img src="..." class="w-6 h-6 rounded-full object-cover" /></div>
<div class="relative inline-flex shrink-0 w-8 h-8"><img src="..." class="w-8 h-8 rounded-full object-cover" /></div>
<div class="relative inline-flex shrink-0 w-10 h-10"><img src="..." class="w-10 h-10 rounded-full object-cover" /></div>
<div class="relative inline-flex shrink-0 w-12 h-12"><img src="..." class="w-12 h-12 rounded-full object-cover" /></div>
<div class="relative inline-flex shrink-0 w-16 h-16"><img src="..." class="w-16 h-16 rounded-full object-cover" /></div>`,
      },
    },
  },
};

export const AvatarGroupStory: Story = {
  name: 'Avatar Group',
  render: () => (
    <div className="bg-white dark:bg-slate-900 p-8 font-body space-y-6">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">3 members</p>
        <AvatarGroup count={3} size="sm" />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">5 members</p>
        <AvatarGroup count={5} size="sm" />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Large — md size</p>
        <AvatarGroup count={4} size="md" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<div class="flex -space-x-2">
  <div class="ring-2 ring-white rounded-full">
    <img src="https://i.pravatar.cc/64?img=1" class="w-8 h-8 rounded-full object-cover" />
  </div>
  <div class="ring-2 ring-white rounded-full">
    <div class="w-8 h-8 rounded-full bg-brand-blue text-white font-semibold flex items-center justify-center text-xs">MR</div>
  </div>
  <div class="ring-2 ring-white rounded-full">
    <img src="https://i.pravatar.cc/64?img=3" class="w-8 h-8 rounded-full object-cover" />
  </div>
</div>`,
      },
    },
  },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="bg-white dark:bg-slate-900 p-8 font-body space-y-10">

      {/* Image variants */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">Image — Round vs Square</p>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <Avatar size="lg" type="image" shape="round" src="https://i.pravatar.cc/64?img=5" />
            <span className="text-[10px] text-slate-400">Round</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar size="lg" type="image" shape="square" src="https://i.pravatar.cc/64?img=5" />
            <span className="text-[10px] text-slate-400">Square</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar size="lg" type="image" shape="round" src="https://i.pravatar.cc/64?img=5" online />
            <span className="text-[10px] text-slate-400">Online</span>
          </div>
        </div>
      </div>

      {/* Initials variants */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">Initials — Round vs Square</p>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <Avatar size="lg" type="initials" shape="round" initials="TG" />
            <span className="text-[10px] text-slate-400">Round</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar size="lg" type="initials" shape="square" initials="TG" />
            <span className="text-[10px] text-slate-400">Square</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar size="lg" type="initials" shape="round" initials="TG" online />
            <span className="text-[10px] text-slate-400">Online</span>
          </div>
        </div>
      </div>

      {/* Groups */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">Avatar Groups</p>
        <div className="space-y-4">
          <AvatarGroup count={3} size="sm" />
          <AvatarGroup count={5} size="sm" />
          <AvatarGroup count={4} size="md" shape="square" />
        </div>
      </div>

      {/* Code snippets */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippets</p>
        <div className="space-y-3">
          {[
            {
              label: 'Image — round md',
              code: `<div class="relative inline-flex shrink-0 w-10 h-10">\n  <img src="https://i.pravatar.cc/64" alt="avatar" class="w-10 h-10 rounded-full object-cover" />\n</div>`,
            },
            {
              label: 'Initials — round md',
              code: `<div class="relative inline-flex shrink-0 w-10 h-10">\n  <div class="w-10 h-10 rounded-full bg-brand-blue text-white font-semibold flex items-center justify-center text-sm">TG</div>\n</div>`,
            },
            {
              label: 'With online indicator',
              code: `<div class="relative inline-flex shrink-0 w-10 h-10">\n  <img src="https://i.pravatar.cc/64" alt="avatar" class="w-10 h-10 rounded-full object-cover" />\n  <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>\n</div>`,
            },
            {
              label: 'Avatar group',
              code: `<div class="flex -space-x-2">\n  <div class="ring-2 ring-white rounded-full"><img src="..." class="w-8 h-8 rounded-full object-cover" /></div>\n  <div class="ring-2 ring-white rounded-full"><div class="w-8 h-8 rounded-full bg-brand-blue text-white font-semibold flex items-center justify-center text-xs">MR</div></div>\n  <div class="ring-2 ring-white rounded-full"><img src="..." class="w-8 h-8 rounded-full object-cover" /></div>\n</div>`,
            },
          ].map((s) => (
            <CodeBlock key={s.label} code={s.code} />
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Avatar: image round with online indicator -->
<div class="relative inline-flex shrink-0 w-10 h-10">
  <img src="https://i.pravatar.cc/64" alt="avatar" class="w-10 h-10 rounded-full object-cover" />
  <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
</div>

<!-- Avatar: initials square -->
<div class="relative inline-flex shrink-0 w-10 h-10">
  <div class="w-10 h-10 rounded-md bg-brand-blue text-white font-semibold flex items-center justify-center text-sm">TG</div>
</div>

<!-- Avatar Group -->
<div class="flex -space-x-2">
  <div class="ring-2 ring-white rounded-full"><img src="..." class="w-8 h-8 rounded-full object-cover" /></div>
  <div class="ring-2 ring-white rounded-full"><div class="w-8 h-8 rounded-full bg-brand-blue text-white font-semibold flex items-center justify-center text-xs">MR</div></div>
</div>`,
      },
    },
  },
};
