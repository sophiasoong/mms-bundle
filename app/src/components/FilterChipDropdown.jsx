import { useEffect, useRef, useState } from 'react';
import { Icon, Chip, Checkbox, Searchbar, Button } from '../ds.js';

export default function FilterChipDropdown({ label, options, selectedValues, onApply }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(selectedValues);
  const [query, setQuery] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const toggle = () => {
    if (!open) {
      setDraft(selectedValues);
      setQuery('');
    }
    setOpen((v) => !v);
  };

  const toggleValue = (value) => {
    setDraft((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  const filteredOptions = options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()));
  const hasSelection = selectedValues.length > 0;

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <Chip variant="filter" selected={hasSelection} onClick={toggle} className="filter-chip-md">
        {label}{hasSelection ? ` (${selectedValues.length})` : ''}
        <Icon name="Down" size={16} />
      </Chip>

      {open && (
        <div
          className="filter-dropdown-panel"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: 4,
            zIndex: 20,
            width: 200,
            background: 'var(--interactive-dropdown-panel-surface-default, #fff)',
            borderRadius: 'var(--radius-md, 8px)',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            paddingTop: 4,
          }}
        >
          <div style={{ padding: '0 8px 8px', borderBottom: '1px solid var(--global-divider-default, #f4f4f4)' }}>
            <Searchbar className="ds-searchbar-md" placeholder="Search in filters" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>

          <div style={{ padding: '4px 0', maxHeight: 260, overflowY: 'auto' }}>
            {filteredOptions.map((o) => (
              <div key={o.value} style={{ display: 'flex', alignItems: 'center', height: 32, padding: '0 8px' }}>
                <Checkbox checked={draft.includes(o.value)} onChange={() => toggleValue(o.value)} label={o.label} />
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 40,
              padding: '0 8px',
              borderTop: '1px solid var(--global-divider-default, #f4f4f4)',
            }}
          >
            <Button style="primary-ghost" size="sm" onClick={() => setDraft([])}>Reset</Button>
            <Button style="primary-solid" size="sm" onClick={() => { onApply(draft); setOpen(false); }}>Apply</Button>
          </div>
        </div>
      )}
    </div>
  );
}
