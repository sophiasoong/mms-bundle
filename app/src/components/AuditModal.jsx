import { Modal, Button } from '../ds.js';
import ReadonlyField from './ReadonlyField.jsx';

export default function AuditModal({ row, onClose }) {
  if (!row) return null;
  return (
    <Modal
      title="Audit Record"
      size="sm"
      onClose={onClose}
      actions={<Button style="primary-solid" size="md" onClick={onClose}>OK</Button>}
    >
      <div style={{ display: 'flex', gap: 'var(--space-layout-section-gap-sm)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-component-gap-lg)', flex: 1, minWidth: 0 }}>
          <ReadonlyField label="Created By" value={row.createdBy} />
          <ReadonlyField label="Last Updated By" value={row.updatedBy} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-component-gap-lg)', flex: 1, minWidth: 0 }}>
          <ReadonlyField label="Created Date" value={row.createdDate} />
          <ReadonlyField label="Last Updated Date" value={row.updated} />
        </div>
      </div>
    </Modal>
  );
}
