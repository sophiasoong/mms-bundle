import { useMemo, useState } from 'react';
import { PageTitle, Button, Badge, Table, Pagination, Select, Input, Icon } from '../ds.js';
import { editHistory, editStatusOptions, pageSizeOptions } from '../mockData.js';
import FilterChipDropdown from './FilterChipDropdown.jsx';

const STATUS_BADGE_COLOR = { Updating: 'secondary', Failed: 'red', Success: 'green' };

const HISTORY_COLUMNS = [
  { key: 'editType', label: 'Edit Type' },
  { key: 'fileName', label: 'File Name' },
  { key: 'status', label: 'Edit Status' },
  { key: 'editBy', label: 'Edit By' },
  { key: 'editTime', label: 'Edit Time' },
  { key: 'download', label: 'Download Error Report', width: 'hug' },
];

export default function EditHistoryPage({ onBack }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState('10');
  const [goToPage, setGoToPage] = useState('');
  const [status, setStatus] = useState([]);

  const filtered = useMemo(
    () => editHistory.filter((h) => !status.length || status.includes(h.status)),
    [status]
  );

  const rows = filtered.map((h) => ({
    editType: h.editType,
    fileName: h.fileName,
    status: <Badge color={STATUS_BADGE_COLOR[h.status] || 'neutral'} label={h.status} />,
    editBy: h.editBy,
    editTime: h.editTime,
    download: h.status === 'Failed' ? (
      <Button style="primary-ghost" size="sm" onClick={() => {}}>Download</Button>
    ) : null,
  }));

  return (
    <>
      <Button style="primary-ghost" size="sm" leadingIcon={<Icon name="Back" size={16} />} onClick={onBack}>
        Back to Bundle Setting
      </Button>

      <PageTitle className="page-title-fig" title="View Edit History" />

      <div
        style={{
          marginTop: 16,
          background: 'var(--surface-card-surface-default, #fff)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            flexWrap: 'wrap',
            padding: 16,
            borderBottom: '1px solid var(--global-divider-default, #f4f4f4)',
          }}
        >
          <FilterChipDropdown
            label="Edit Status"
            options={editStatusOptions}
            selectedValues={status}
            onApply={setStatus}
          />
          <Button style="primary-ghost" size="md" onClick={() => setStatus([])}>Reset</Button>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            padding: 16,
            borderBottom: '1px solid var(--global-divider-default, #f4f4f4)',
          }}
        >
          <div style={{ fontSize: 14, color: 'var(--text-body-secondary-neutral)' }}>
            {filtered.length} of {editHistory.length} results
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 14, color: 'var(--text-body-secondary-neutral)' }}>
              Last Updated 2026-07-14 09:41
            </div>
            <Button style="primary-outline" size="md" onClick={() => {}}>Refresh</Button>
          </div>
        </div>

        <Table columns={HISTORY_COLUMNS} rows={rows} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: 16 }}>
          <div style={{ fontSize: 14, color: 'var(--text-body-secondary-neutral)' }}>
            {filtered.length === 0 ? '0 results' : `1-${Math.min(filtered.length, Number(pageSize))} of ${filtered.length} results`}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Pagination current={page} total={Math.max(1, Math.ceil(filtered.length / Number(pageSize)))} onChange={setPage} />
            <Select className="pagesize-select-fig" options={pageSizeOptions} value={pageSize} onChange={setPageSize} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14, color: 'var(--text-body-primary-neutral)' }}>Go to</span>
              <div style={{ width: 48 }}>
                <Input className="goto-input" value={goToPage} onChange={(e) => setGoToPage(e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: 80 }} />
    </>
  );
}
