import { useMemo, useState } from 'react';
import {
  Table,
  Badge,
  Button,
  Checkbox,
  Select,
  Input,
  Searchbar,
  PageTitle,
  Breadcrumb,
  Pagination,
} from './ds.js';
import SidebarNav from './components/SidebarNav.jsx';
import TopbarNew from './components/TopbarNew.jsx';
import FilterChipDropdown from './components/FilterChipDropdown.jsx';
import {
  bundles,
  storefrontOptions,
  statusOptions,
  pageSizeOptions,
  storeOptionsByBusinessUnit,
} from './mockData.js';
import AuditModal from './components/AuditModal.jsx';
import EditBundleModal from './components/EditBundleModal.jsx';
import SkuDetailModal from './components/SkuDetailModal.jsx';
import BundleSetPanel from './components/BundleSetPanel.jsx';
import CreateBundlePage from './components/CreateBundlePage.jsx';
import EditHistoryPage from './components/EditHistoryPage.jsx';
import { BatchUploadOptionModal, BatchFileModal } from './components/BatchModals.jsx';

const STATUS_LABEL = { online: 'Online', offline: 'Offline', suspended: 'Suspended' };
const STATUS_BADGE_COLOR = { Online: 'green', Offline: 'red', Suspended: 'neutral' };

function CollapsedLogo() {
  return (
    <div
      style={{
        width: 260,
        height: 68,
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: 8,
        flexShrink: 0,
        boxSizing: 'border-box',
      }}
    >
      <img
        src="/design-system/assets/logo/hktv-logo-round.svg"
        alt=""
        style={{ width: 52, height: 52, flexShrink: 0 }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <img src="/design-system/assets/logo/wordmark-merchant.svg" alt="Merchant" style={{ height: 27, width: 167 }} />
        <img src="/design-system/assets/logo/wordmark-management-system.svg" alt="Management System" style={{ height: 15, width: 168 }} />
      </div>
    </div>
  );
}

export default function OverviewPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState('10');
  const [goToPage, setGoToPage] = useState('');
  const [skuSearch, setSkuSearch] = useState('');
  const [storefront, setStorefront] = useState([]);
  const [status, setStatus] = useState([]);
  const [selected, setSelected] = useState(() => new Set());

  const [modal, setModal] = useState(null); // null | 'audit' | 'editBundle' | 'skuDetail' | 'bundleSet' | 'batchOption' | 'batchCreate' | 'batchEdit'
  const [view, setView] = useState('list'); // 'list' | 'create' | 'history'
  const [bundleSetReturn, setBundleSetReturn] = useState(null);
  const [editingRow, setEditingRow] = useState(null);
  const [nameTC, setNameTC] = useState('');
  const [nameEN, setNameEN] = useState('');
  const [presetQty, setPresetQty] = useState(0);
  const [skuIdQuery, setSkuIdQuery] = useState('');
  const [skuNameQuery, setSkuNameQuery] = useState('');

  const [businessUnit, setBusinessUnit] = useState('HKTVmall');
  const [batchMethod, setBatchMethod] = useState('create');
  const [batchStore, setBatchStore] = useState(storeOptionsByBusinessUnit.HKTVmall[0].value);

  const filtered = useMemo(() => bundles.filter((b) => {
    if (skuSearch && !b.parentSku.toLowerCase().includes(skuSearch.toLowerCase())) return false;
    if (storefront.length && !storefront.includes(b.storefrontCode)) return false;
    if (status.length && !status.some((v) => b.status === STATUS_LABEL[v])) return false;
    return true;
  }), [skuSearch, storefront, status]);

  const clearAll = () => {
    setSkuSearch('');
    setStorefront([]);
    setStatus([]);
  };

  const closeModal = () => {
    setModal(null);
    setEditingRow(null);
  };

  const openEditBundle = (row) => {
    setEditingRow(row);
    setNameTC(row.nameTC);
    setNameEN(row.nameEN);
    setPresetQty(row.preset);
    setModal('editBundle');
  };

  const openCreatePage = () => {
    setNameTC('');
    setNameEN('');
    setPresetQty(0);
    setView('create');
  };
  const closeCreatePage = () => setView('list');

  const openEditHistory = () => setView('history');
  const closeEditHistory = () => setView('list');

  const openAudit = (row) => {
    setEditingRow(row);
    setModal('audit');
  };

  const openSkuDetail = (row) => {
    setEditingRow(row);
    setModal('skuDetail');
  };

  const openBundleSetFromCreate = () => {
    setBundleSetReturn(null);
    setModal('bundleSet');
  };
  const closeBundleSet = () => {
    setSkuIdQuery('');
    setSkuNameQuery('');
    setModal(bundleSetReturn);
  };

  const openBatchOption = () => {
    setBusinessUnit('HKTVmall');
    setBatchMethod('create');
    setBatchStore(storeOptionsByBusinessUnit.HKTVmall[0].value);
    setModal('batchOption');
  };
  const selectBatchBusinessUnit = (bu) => {
    setBusinessUnit(bu);
    setBatchStore(storeOptionsByBusinessUnit[bu][0].value);
  };
  const goBatchNext = () => setModal(batchMethod === 'create' ? 'batchCreate' : 'batchEdit');

  const toggleSelect = (parentSku, checked) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(parentSku);
      else next.delete(parentSku);
      return next;
    });
  };
  const toggleSelectAll = (checked) => {
    setSelected(checked ? new Set(filtered.map((b) => b.parentSku)) : new Set());
  };

  const rowActions = (b) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <Button style="primary-ghost" size="sm" onClick={() => openEditBundle(b)}>Edit</Button>
    </div>
  );

  const allSelected = filtered.length > 0 && filtered.every((b) => selected.has(b.parentSku));
  const someSelected = filtered.some((b) => selected.has(b.parentSku));

  const tableColumns = [
    {
      key: 'select',
      label: (
        <Checkbox
          checked={allSelected}
          indeterminate={!allSelected && someSelected}
          onChange={toggleSelectAll}
        />
      ),
    },
    { key: 'parentSku', label: 'Parent SKU ID' },
    { key: 'storefront', label: 'Storefront Code' },
    { key: 'nameTC', label: 'Bundle Name (Traditional Chinese)' },
    { key: 'nameEN', label: 'Bundle Name (English)' },
    { key: 'ready', label: 'Product Ready Method' },
    { key: 'available', label: 'Available QTY' },
    { key: 'preset', label: 'Pre-Set QTY' },
    { key: 'status', label: 'Status' },
    { key: 'updated', label: 'Update Time', width: 'hug' },
    { key: 'actions', label: 'Action' },
  ];

  const tableRows = filtered.map((b) => ({
    select: <Checkbox checked={selected.has(b.parentSku)} onChange={(v) => toggleSelect(b.parentSku, v)} />,
    parentSku: (
      <button
        type="button"
        onClick={() => openSkuDetail(b)}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          font: 'inherit',
          fontSize: 'var(--text-sm-size)',
          color: 'var(--brand-primary-400, #5244ee)',
          textDecoration: 'underline',
          cursor: 'pointer',
        }}
      >
        {b.parentSku}
      </button>
    ),
    storefront: b.storefrontCode,
    nameTC: b.nameTC,
    nameEN: b.nameEN,
    ready: b.ready,
    available: b.available,
    preset: b.preset,
    status: <Badge color={STATUS_BADGE_COLOR[b.status] || 'neutral'} label={b.status} />,
    updated: `${b.updated} ${b.updatedTime}`,
    actions: rowActions(b),
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%', background: 'var(--global-background-page)' }}>
      <div
        style={{
          display: 'flex',
          flexShrink: 0,
          gap: 'var(--space-component-gap-lg)',
          background: 'var(--surface-topbar-background-default, #fff)',
          boxShadow: '0 2px 4px var(--interactive-dropdown-panel-shadow-default, #d9d9d9)',
        }}
      >
        {sidebarCollapsed ? (
          <CollapsedLogo />
        ) : (
          <img
            src="/design-system/assets/logo/mms-wordmark.png"
            alt="Merchant Management System"
            style={{ width: 260, height: 68, objectFit: 'contain', flexShrink: 0, background: 'var(--surface-topbar-background-default, #fff)' }}
          />
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <TopbarNew onToggleSidebar={() => setSidebarCollapsed((v) => !v)} />
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        <div
          style={{
            width: sidebarCollapsed ? 0 : 260,
            flexShrink: 0,
            overflow: 'hidden',
            transition: 'width var(--duration-normal, 200ms) var(--ease-standard, ease)',
          }}
        >
          <SidebarNav activeValue="bundle" onSelect={() => {}} />
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '24px', minWidth: 0 }}>
          {view === 'create' ? (
            <CreateBundlePage
              nameTC={nameTC}
              nameEN={nameEN}
              presetQty={presetQty}
              onChangeNameTC={setNameTC}
              onChangeNameEN={setNameEN}
              onChangePresetQty={setPresetQty}
              onOpenBundleSet={openBundleSetFromCreate}
              onCancel={closeCreatePage}
              onSave={closeCreatePage}
            />
          ) : view === 'history' ? (
            <EditHistoryPage onBack={closeEditHistory} />
          ) : (
          <>
          <Breadcrumb items={[{ label: 'MMS' }, { label: 'Product & Inventory' }, { label: 'Bundle Setting' }]} />

          <PageTitle
            className="page-title-fig"
            title="Bundle Setting"
            actions={(
              <div style={{ display: 'flex', gap: 8 }}>
                <Button style="primary-outline" size="md" onClick={openBatchOption}>Batch Create/Edit</Button>
                <Button style="primary-solid" size="md" onClick={openCreatePage}>Create Bundle Set</Button>
              </div>
            )}
          />

          <div
            style={{
              marginTop: 16,
              display: 'flex',
              gap: selected.size > 0 ? 16 : 0,
              alignItems: 'flex-start',
              transition: 'gap var(--duration-normal, 240ms) var(--ease-standard, ease)',
            }}
          >
          <div
            style={{
              flex: 1,
              minWidth: 0,
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
              <div style={{ width: 220 }}>
                <Searchbar
                  className="ds-searchbar-md"
                  placeholder="Search Parent SKU ID"
                  value={skuSearch}
                  onChange={(e) => setSkuSearch(e.target.value)}
                />
              </div>
              <FilterChipDropdown
                label="Storefront Code"
                options={storefrontOptions}
                selectedValues={storefront}
                onApply={setStorefront}
              />
              <FilterChipDropdown
                label="Status"
                options={statusOptions}
                selectedValues={status}
                onApply={setStatus}
              />
              <Button style="primary-ghost" size="md" onClick={clearAll}>Reset</Button>
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
                {filtered.length} of 265 results
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button style="primary-outline" size="md" onClick={openEditHistory}>Edit History</Button>
                </div>
              </div>
            </div>

            <Table className="overview-table" columns={tableColumns} rows={tableRows} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: 16 }}>
              <div style={{ fontSize: 14, color: 'var(--text-body-secondary-neutral)' }}>
                {Math.min((page - 1) * Number(pageSize) + 1, 265)}-{Math.min(page * Number(pageSize), 265)} of 265 results
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <Pagination current={page} total={27} onChange={setPage} />
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

          <div
            style={{
              width: selected.size > 0 ? 280 : 0,
              opacity: selected.size > 0 ? 1 : 0,
              flexShrink: 0,
              overflow: 'hidden',
              transition: 'width var(--duration-normal, 240ms) var(--ease-standard, ease), opacity var(--duration-normal, 240ms) var(--ease-standard, ease)',
            }}
          >
            <div
              style={{
                width: 280,
                display: 'flex',
                flexDirection: 'column',
                background: 'var(--global-background-surface, #fff)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div
                style={{
                  padding: 16,
                  borderBottom: '1px solid var(--global-divider-default, #f4f4f4)',
                }}
              >
                <span className="ds-modal-title">Selected Action</span>
              </div>
              <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ fontSize: 14, color: 'var(--text-body-secondary-neutral)' }}>
                  {selected.size} bundle{selected.size === 1 ? '' : 's'} selected
                </div>
                <Button style="primary-solid" size="md" onClick={() => {}} className="align-self-start">Export Selected</Button>
              </div>
            </div>
          </div>
          </div>

          <div style={{ height: 80 }} />
          </>
          )}
        </div>
      </div>

      {modal === 'audit' && <AuditModal row={editingRow} onClose={closeModal} />}

      {modal === 'skuDetail' && <SkuDetailModal row={editingRow} onClose={closeModal} />}

      {modal === 'editBundle' && (
        <EditBundleModal
          editingRow={editingRow}
          nameTC={nameTC}
          nameEN={nameEN}
          presetQty={presetQty}
          onChangeNameTC={setNameTC}
          onChangeNameEN={setNameEN}
          onChangePresetQty={setPresetQty}
          onClose={closeModal}
          onSave={closeModal}
        />
      )}

      {modal === 'bundleSet' && (
        <BundleSetPanel
          skuIdQuery={skuIdQuery}
          skuNameQuery={skuNameQuery}
          onChangeSkuIdQuery={setSkuIdQuery}
          onChangeSkuNameQuery={setSkuNameQuery}
          onClearAll={() => { setSkuIdQuery(''); setSkuNameQuery(''); }}
          onClose={closeBundleSet}
          onDone={closeBundleSet}
        />
      )}

      {modal === 'batchOption' && (
        <BatchUploadOptionModal
          businessUnit={businessUnit}
          batchMethod={batchMethod}
          batchStore={batchStore}
          onSelectBusinessUnit={selectBatchBusinessUnit}
          onSelectMethod={setBatchMethod}
          onChangeStore={setBatchStore}
          onClose={closeModal}
          onNext={goBatchNext}
        />
      )}

      {(modal === 'batchCreate' || modal === 'batchEdit') && (
        <BatchFileModal mode={batchMethod} onClose={closeModal} onSubmit={closeModal} />
      )}
    </div>
  );
}
