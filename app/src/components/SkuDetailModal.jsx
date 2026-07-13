import { Modal, Button } from '../ds.js';
import ReadonlyField from './ReadonlyField.jsx';

export default function SkuDetailModal({ row, onClose }) {
  if (!row) return null;
  const childSkuId = `${row.parentSku}-C1`;

  return (
    <Modal
      title={`Bundle Set - ${row.parentSku}`}
      size="md"
      onClose={onClose}
      actions={<Button style="primary-solid" size="md" onClick={onClose}>Done</Button>}
    >
      <div style={{ display: 'flex', gap: 'var(--space-layout-section-gap-sm)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-component-gap-lg)', flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-component-gap-sm)' }}>
            <span style={{ fontSize: 'var(--text-sm-size)', lineHeight: 'var(--text-sm-line-height)', color: 'var(--text-label-primary)' }}>Image</span>
            <img
              src={row.image}
              alt={row.nameEN}
              width={40}
              height={40}
              style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
            />
          </div>
          <ReadonlyField label="SKU Name (CH)" value={row.nameTC} />
          <ReadonlyField label="Product Ready Method" value={row.ready} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-component-gap-lg)', flex: 1, minWidth: 0 }}>
          <ReadonlyField label="SKU ID" value={childSkuId} />
          <ReadonlyField label="SKU Name (EN)" value={row.nameEN} />
          <ReadonlyField label="Qty per Bundle" value={row.preset} />
        </div>
      </div>
    </Modal>
  );
}
