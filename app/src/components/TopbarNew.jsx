import { Icon, Avatar, Dropdown, Searchbar } from '../ds.js';

function HamburgerIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <path d="M0 2h16M0 8h16M0 14h16" stroke="var(--brand-primary-400, #5244ee)" strokeWidth={2} />
    </svg>
  );
}

export default function TopbarNew({ onToggleSidebar }) {
  return (
    <div
      style={{
        height: 68,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        paddingRight: 'var(--space-component-padding-2xl, 32px)',
      }}
    >
      <div style={{ display: 'flex', flex: 1, alignItems: 'center', gap: 'var(--space-component-gap-md, 12px)', minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={onToggleSidebar}
            style={{
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--brand-primary-400, #5244ee)',
              borderRadius: 'var(--radius-md, 8px)',
              background: '#fff',
              cursor: 'pointer',
            }}
          >
            <HamburgerIcon />
          </button>

          <Dropdown
            align="left"
            trigger={(
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  height: 40,
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md, 8px)',
                  background: '#fff',
                  cursor: 'pointer',
                }}
              >
                <Avatar name="The Place" size={24} />
                <span style={{ fontSize: 16, color: 'var(--interactive-menu-trigger-label-default, #1e1e1e)' }}>Store Name</span>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand-green-600, #52c41a)', display: 'inline-block' }} />
                <Icon name="Down" size={16} />
              </div>
            )}
            items={[{ label: 'HKTVmall Store' }, { label: 'ThePlace Store' }]}
          />
        </div>

        <div style={{ flex: '1 1 120px', minWidth: 100, maxWidth: 640 }}>
          <Searchbar className="ds-searchbar-lg" placeholder="Placeholder" />
        </div>

        <div style={{ display: 'flex', flexShrink: 0, alignItems: 'center', justifyContent: 'flex-end', gap: 12 }}>
          <div
            style={{
              height: 24,
              padding: '2px 8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'var(--radius-md, 8px)',
              background: 'var(--interactive-button-surface-secondary-solid-default, #fff7e6)',
              color: 'var(--interactive-button-label-secondary-solid-default, #996100)',
              fontSize: 'var(--text-md-size, 16px)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Back to MMS 1.0
          </div>

          <button
            type="button"
            aria-label="FAQ"
            style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <Icon name="FAQ" size={24} />
          </button>

          <button
            type="button"
            aria-label="Notifications"
            style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', position: 'relative' }}
          >
            <Icon name="Notification" size={24} />
            <span
              style={{
                position: 'absolute',
                top: 2,
                right: 2,
                background: 'var(--brand-danger-500, #ff4d4f)',
                color: '#fff',
                fontSize: 10,
                lineHeight: '14px',
                borderRadius: 8,
                padding: '0 4px',
              }}
            >
              99+
            </span>
          </button>

          <Dropdown
            align="right"
            trigger={(
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 24, padding: '8px 12px', cursor: 'pointer' }}>
                <span style={{ fontSize: 14, color: 'var(--interactive-menu-trigger-label-default, #1e1e1e)' }}>English</span>
                <Icon name="Down" size={16} />
              </div>
            )}
            items={[{ label: 'English' }, { label: '繁體中文' }]}
          />

          <Dropdown
            align="right"
            trigger={(
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  height: 24,
                  padding: '8px 12px',
                  borderLeft: '1px solid var(--brand-neutral-500, #d9d9d9)',
                  cursor: 'pointer',
                }}
              >
                <Avatar name="Merchant Admin" size={16} />
                <span style={{ fontSize: 14, color: 'var(--interactive-menu-trigger-label-default, #1e1e1e)' }}>User Name</span>
                <Icon name="Down" size={16} />
              </div>
            )}
            items={[{ label: 'Profile' }, { label: 'Log Out' }]}
          />
        </div>
      </div>
    </div>
  );
}
