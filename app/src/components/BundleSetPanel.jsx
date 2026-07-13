import { ActionPanel, Input, Button, Table } from '../ds.js';

const skuColumns = [
  { key: 'image', label: 'Image' },
  { key: 'skuId', label: 'SKU ID' },
  { key: 'nameCH', label: 'SKU Name (CH)' },
  { key: 'nameEN', label: 'SKU Name (EN)' },
  { key: 'ready', label: 'Product Ready Method' },
  { key: 'qty', label: 'QTY per Bundle' },
];

export default function BundleSetPanel({
  skuIdQuery,
  skuNameQuery,
  onChangeSkuIdQuery,
  onChangeSkuNameQuery,
  onClearAll,
  onClose,
  onDone,
}) {
  return (
    <ActionPanel
      title="Bundle Set"
      onClose={onClose}
      footer={<Button style="primary-solid" size="md" onClick={onDone}>Done</Button>}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <Input placeholder="SKU ID" value={skuIdQuery} onChange={(e) => onChangeSkuIdQuery(e.target.value)} />
          </div>
          <div style={{ flex: 1 }}>
            <Input placeholder="SKU Name" value={skuNameQuery} onChange={(e) => onChangeSkuNameQuery(e.target.value)} />
          </div>
        </div>
        <Button style="primary-ghost" size="sm" onClick={onClearAll}>Clear All</Button>
        <Table columns={skuColumns} rows={[]} />
        <div style={{ fontSize: 12, color: 'var(--text-caption-primary)', textAlign: 'center' }}>0 results</div>
      </div>
    </ActionPanel>
  );
}
