import { useState } from 'react';
import { Icon } from '../ds.js';

const SECTIONS = [
  {
    key: 'main',
    label: 'Main',
    items: [
      { value: 'order', label: 'Order Management', icon: 'Order' },
      { value: 'product', label: 'Product and Inventory', icon: 'Product', children: [
        { value: 'bundle', label: 'Bundle Setting' },
      ] },
      { value: 'merchant-dashboard', label: 'Merchant Dashboard', icon: 'MerchantDashboard' },
      { value: 'merchant-ad', label: 'Merchant Advertisment', icon: 'MerchantAd' },
      { value: 'payment', label: 'Payment Center', icon: 'Payment' },
      { value: 'ratings', label: 'Ratings and Reviews', icon: 'RatingStyleOutlined' },
      { value: 'merchant', label: 'Merchant', icon: 'Solution' },
      { value: 'system', label: 'System', icon: 'System' },
    ],
  },
  {
    key: 'platform-support',
    label: 'Platform Support',
    items: [
      { value: 'return', label: 'Return Request', icon: 'Return' },
    ],
  },
  {
    key: 'hktv',
    label: 'HKTVmall',
    items: [
      { value: 'store-hktv', label: 'Store Management', icon: 'StoreHktv' },
      { value: '3pl', label: '3PL', icon: 'PL3' },
      { value: 'promotion', label: 'Promotion Management', icon: 'Promotion' },
    ],
  },
  {
    key: 'theplace',
    label: 'ThePlace',
    items: [
      { value: 'store-theplace', label: 'Store Management', icon: 'StoreTheplace' },
    ],
  },
];

function SectionHeader({ label, expanded, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        height: 40,
        padding: '0 var(--space-component-padding-md)',
        color: 'var(--interactive-sidebar-header-label-default)',
        fontWeight: 500,
        fontSize: 16,
        cursor: 'pointer',
        width: '100%',
      }}
    >
      <span style={{ flex: 1 }}>{label}</span>
      <span style={{ width: 16, height: 16, display: 'inline-flex', transform: expanded ? 'none' : 'rotate(180deg)' }}>
        <Icon name="Up2" size={16} />
      </span>
    </div>
  );
}

function ItemRow({ item, activeValue, onSelect, expandedItems, onToggleItem }) {
  const hasChildren = !!item.children;
  const isOpen = expandedItems.has(item.value);
  const isActive = item.value === activeValue;

  return (
    <div style={{ width: '100%' }}>
      <div
        className={`ds-sidebar-item ${isActive ? 'is-active' : ''}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          height: 40,
          padding: '0 var(--space-component-padding-md)',
          borderRadius: 'var(--radius-lg, 12px)',
          cursor: 'pointer',
        }}
        onClick={() => (hasChildren ? onToggleItem(item.value) : onSelect(item.value))}
      >
        <span className="ds-sidebar-icon" style={{ display: 'inline-flex', width: 20, height: 20 }}>
          <Icon name={item.icon} size={20} />
        </span>
        <span style={{ flex: 1, fontSize: 14 }}>{item.label}</span>
        {hasChildren && (
          <span
            style={{
              width: 12,
              height: 12,
              display: 'inline-flex',
              transform: isOpen ? 'rotate(90deg)' : 'none',
            }}
          >
            <Icon name="Right2" size={12} />
          </span>
        )}
      </div>
      {hasChildren && isOpen && (
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 20 }}>
          {item.children.map((child) => (
            <div
              key={child.value}
              className={`ds-sidebar-item ${child.value === activeValue ? 'is-active' : ''}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                height: 40,
                padding: '0 var(--space-component-padding-md)',
                borderRadius: 'var(--radius-lg, 12px)',
                cursor: 'pointer',
                fontSize: 14,
              }}
              onClick={() => onSelect(child.value)}
            >
              {child.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SidebarNav({ activeValue, onSelect }) {
  const [expandedSections, setExpandedSections] = useState(() => new Set(SECTIONS.map((s) => s.key)));
  const [expandedItems, setExpandedItems] = useState(() => new Set(['product']));

  const toggleSection = (key) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const toggleItem = (value) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  return (
    <div
      className="ds-sidebar"
      style={{
        width: 260,
        background: 'var(--surface-sidebar-surface-default)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-component-gap-sm)',
        padding: '0 var(--space-component-padding-md)',
        overflowY: 'auto',
        height: '100%',
      }}
    >
      {SECTIONS.map((section) => {
        const expanded = expandedSections.has(section.key);
        return (
          <div key={section.key} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-component-gap-sm)', width: '100%' }}>
            <SectionHeader label={section.label} expanded={expanded} onToggle={() => toggleSection(section.key)} />
            {expanded && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-component-gap-xs)',
                  width: '100%',
                  paddingLeft: 'var(--space-component-padding-sm)',
                }}
              >
                <div style={{ borderLeft: '1px solid var(--interactive-sidebar-item-label-default)', display: 'flex', flexDirection: 'column', gap: 'var(--space-component-gap-xs)', width: '100%' }}>
                  {section.items.map((item) => (
                    <ItemRow
                      key={item.value}
                      item={item}
                      activeValue={activeValue}
                      onSelect={onSelect}
                      expandedItems={expandedItems}
                      onToggleItem={toggleItem}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
