"use client";

import React, { useState } from 'react';
import {
  Home,
  Zap,
  Send,
  ClipboardList,
  Truck,
  DollarSign,
  FileText,
  Bell,
  Settings,
  User,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Building2,
  Users,
} from 'lucide-react';
import { Logo } from './Logo';
import { Badge } from './Badge';
import { Avatar } from './Avatar';
import { useIsMobile } from './hooks/useIsMobile';

// Figma 742-64588 (atom SidebarItem) + 742-64604 (full Sidebar)
// Expanded: 256px wide, bg white, border-r #e2e8f0, py-24 px-16
// Collapsed: 66px wide, py-24 px-12 — icon only
// SidebarItem states: Default #64748b, Selected bg #f3f3f5 text #1b306c, Hover bg #f3f3f5 text #7e859a
// BETA badge: bg #0043ff white 10px rounded-full

// ─── Types ────────────────────────────────────────────────────────────────────

export type SidebarItemState = 'Default' | 'Selected' | 'Hover';

export type SidebarItemProps = {
  label?: string;
  icon: React.ReactNode;
  state?: SidebarItemState;
  collapsed?: boolean;
  badge?: string;
  showChevron?: boolean;
  onClick?: () => void;
  className?: string;
};

export type SidebarNavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
};

export type SidebarProps = {
  collapsed?: boolean;
  activeItem?: string;
  onItemClick?: (id: string) => void;
  onCollapseToggle?: () => void;
  userName?: string;
  userInitials?: string;
  orgName?: string;
  teamName?: string;
  items?: SidebarNavItem[];
  className?: string;
};

// ─── Default nav items ────────────────────────────────────────────────────────

const DEFAULT_ITEMS: SidebarNavItem[] = [
  { id: 'home',          label: 'Home',                   icon: <Home className="w-[18px] h-[18px]" /> },
  { id: 'ai',            label: 'AI Shipping Assistant',  icon: <Zap className="w-[18px] h-[18px]" />, badge: 'BETA' },
  { id: 'shipping',      label: 'Multi-carrier Shipping', icon: <Send className="w-[18px] h-[18px]" /> },
  { id: 'sameday',       label: 'Ship Same-day',          icon: <ClipboardList className="w-[18px] h-[18px]" /> },
  { id: 'track',         label: 'Track Orders',           icon: <Truck className="w-[18px] h-[18px]" /> },
  { id: 'billing',       label: 'Billing',                icon: <DollarSign className="w-[18px] h-[18px]" /> },
  { id: 'transactions',  label: 'Transaction History',    icon: <FileText className="w-[18px] h-[18px]" /> },
  { id: 'notifications', label: 'Notifications',          icon: <Bell className="w-[18px] h-[18px]" /> },
  { id: 'org-settings',  label: 'Organization Settings',  icon: <Settings className="w-[18px] h-[18px]" /> },
  { id: 'user-settings', label: 'User Settings',          icon: <User className="w-[18px] h-[18px]" /> },
];

// ─── SidebarItem atom ─────────────────────────────────────────────────────────

export function SidebarItem({
  label,
  icon,
  state = 'Default',
  collapsed = false,
  badge,
  showChevron = false,
  onClick,
  className = '',
}: SidebarItemProps) {
  const [hovered, setHovered] = useState(false);
  const effectiveState = state === 'Default' && hovered ? 'Hover' : state;

  const isSelected = effectiveState === 'Selected';
  const isHover = effectiveState === 'Hover';
  const isActive = isSelected || isHover;

  const iconColor = isSelected ? 'var(--color-text-accent)' : isHover ? '#7e859a' : 'var(--color-text-secondary)';
  const textColor = isSelected ? 'var(--color-text-primary)' : isHover ? '#7e859a' : 'var(--color-text-secondary)';

  const style: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: collapsed ? 0 : 8,
    borderRadius: 5,
    cursor: 'pointer',
    transition: 'background-color var(--motion-fast) var(--ease-std)',
    ...(collapsed
      ? { justifyContent: 'center', padding: 8, width: 34 }
      : { padding: isSelected ? '12px 8px' : 8, width: '100%' }),
    backgroundColor: isActive ? 'var(--color-bg-canvas)' : 'transparent',
  };

  return (
    <div
      style={style}
      className={className}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick?.()}
    >
      <span style={{ color: iconColor, display: 'flex', alignItems: 'center', flexShrink: 0, width: 18, height: 18 }}>
        {icon}
      </span>

      {!collapsed && label && (
        <>
          <span style={{ flex: 1, fontSize: 12, fontWeight: 500, fontFamily: 'Inter', lineHeight: '16px', color: textColor, minWidth: 0 }}>
            {label}
          </span>
          {badge && (
            <Badge text={badge} color="Primary" state="Fill" round dot={false} />
          )}
          {showChevron && (
            <span style={{ color: iconColor, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <ChevronDown className="w-[18px] h-[18px]" />
            </span>
          )}
        </>
      )}
    </div>
  );
}

// ─── Sidebar full ─────────────────────────────────────────────────────────────

export function Sidebar({
  collapsed: collapsedProp = false,
  activeItem = 'org-settings',
  onItemClick,
  onCollapseToggle,
  userName = 'Joshe Ordonez',
  userInitials = 'JO',
  orgName = 'Airpals',
  teamName = 'No team selected',
  items = DEFAULT_ITEMS,
  className = '',
}: SidebarProps) {
  const isMobile = useIsMobile();
  const collapsed = collapsedProp || isMobile;
  const containerStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-bg-primary)',
    borderRight: '1px solid var(--color-border-primary)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 24,
    fontFamily: 'Inter',
    overflow: 'hidden',
    flexShrink: 0,
    ...(collapsed
      ? { width: 66, paddingLeft: 12, paddingRight: 12, justifyContent: 'space-between', minHeight: '100vh' }
      : { width: 256, paddingLeft: 16, paddingRight: 16, gap: 24 }),
  };

  return (
    <nav style={containerStyle} className={className}>
      {!collapsed && (
        <>
          {/* Top section: logo + collapse btn + nav items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36, width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Logo color="original" height={28} />
              <button
                onClick={onCollapseToggle}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', display: 'flex', padding: 0 }}
                aria-label="Collapse sidebar"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
              {items.map(item => (
                <SidebarItem
                  key={item.id}
                  label={item.label}
                  icon={item.icon}
                  badge={item.badge}
                  state={activeItem === item.id ? 'Selected' : 'Default'}
                  onClick={() => onItemClick?.(item.id)}
                />
              ))}
              <div style={{ height: 1, backgroundColor: 'var(--color-border-primary)', width: '100%' }} />
            </div>
          </div>

          {/* Organizations + Team */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, width: '100%' }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-secondary)', lineHeight: '16px' }}>Organizations</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 8px', borderRadius: 5, backgroundColor: 'var(--color-bg-canvas)', cursor: 'pointer' }}>
                <span style={{ color: 'var(--color-text-primary)', display: 'flex', flexShrink: 0 }}>
                  <Building2 className="w-[18px] h-[18px]" />
                </span>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 400, color: 'var(--color-text-primary)', lineHeight: '20px' }}>{orgName}</span>
                <span style={{ color: 'var(--color-text-secondary)', display: 'flex', flexShrink: 0 }}>
                  <ChevronDown className="w-[18px] h-[18px]" />
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, width: '100%' }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-secondary)', lineHeight: '16px' }}>Placing orders as team</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 8px', borderRadius: 5, backgroundColor: 'var(--color-bg-canvas)', cursor: 'pointer' }}>
                <span style={{ color: 'var(--color-text-primary)', display: 'flex', flexShrink: 0 }}>
                  <Users className="w-[18px] h-[18px]" />
                </span>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 400, color: 'var(--color-text-primary)', lineHeight: '20px' }}>{teamName}</span>
                <span style={{ color: 'var(--color-text-secondary)', display: 'flex', flexShrink: 0 }}>
                  <ChevronDown className="w-[18px] h-[18px]" />
                </span>
              </div>
            </div>
          </div>

          {/* Profile */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', marginTop: 'auto' }}>
            <div style={{ height: 1, backgroundColor: 'var(--color-border-primary)', width: '100%' }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <Avatar size="sm" variant="Initials" initials={userInitials} corner="Full" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: '20px' }}>{userName}</span>
                <a href="#" style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-accent)', lineHeight: '16px', textDecoration: 'none' }}>Sign out</a>
              </div>
            </div>
          </div>
        </>
      )}

      {collapsed && (
        <>
          {/* Top: logo (clickeable → expand) + nav icons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', alignItems: 'center' }}>
            <button
              onClick={onCollapseToggle}
              aria-label="Expand sidebar"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              <Logo color="original" height={28} orientation="symbol" />
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center', width: '100%' }}>
              {items.map(item => (
                <SidebarItem
                  key={item.id}
                  icon={item.icon}
                  collapsed
                  state={activeItem === item.id ? 'Selected' : 'Default'}
                  onClick={() => onItemClick?.(item.id)}
                />
              ))}
              <div style={{ height: 1, backgroundColor: 'var(--color-border-primary)', width: '100%' }} />
            </div>
          </div>

          {/* Org + team icons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
            <SidebarItem icon={<Building2 className="w-[18px] h-[18px]" />} collapsed state="Default" />
            <SidebarItem icon={<Users className="w-[18px] h-[18px]" />} collapsed state="Default" />
          </div>

          {/* Profile collapsed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, alignItems: 'center', width: '100%' }}>
            <div style={{ height: 1, backgroundColor: 'var(--color-border-primary)', width: '100%' }} />
            <Avatar size="sm" variant="Initials" initials={userInitials} corner="Full" />
            <a href="#" style={{ fontSize: 10, fontWeight: 500, fontFamily: 'Inter', color: 'var(--color-text-accent)', textDecoration: 'none', textAlign: 'center' }}>Sign out</a>
          </div>
        </>
      )}
    </nav>
  );
}
