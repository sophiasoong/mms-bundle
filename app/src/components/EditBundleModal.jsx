import { Modal, Input, NumberInput, Button } from '../ds.js';
import ReadonlyField from './ReadonlyField.jsx';

export default function EditBundleModal({
  editingRow,
  nameTC,
  nameEN,
  presetQty,
  onChangeNameTC,
  onChangeNameEN,
  onChangePresetQty,
  onClose,
  onSave,
}) {
  return (
    <Modal
      title="Edit Bundle Set"
      size="md"
      onClose={onClose}
      actions={(
        <>
          <Button style="primary-outline" size="md" onClick={onClose}>Cancel</Button>
          <Button style="primary-solid" size="md" onClick={onSave}>Save</Button>
        </>
      )}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, minWidth: 0 }}>
            <ReadonlyField label="Parent SKU ID" value={editingRow?.parentSku ?? '—'} />
            <ReadonlyField label="Product Ready Method" value={editingRow?.ready ?? '—'} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, minWidth: 0 }}>
            <ReadonlyField label="Storefront Code" value={editingRow?.storefront ?? '—'} />
            <ReadonlyField label="Available Qty" value={editingRow?.available ?? '—'} />
          </div>
        </div>
        <Input
          className="ds-field-md"
          label="Bundle Name (Traditional Chinese)"
          placeholder="Enter bundle name"
          value={nameTC}
          onChange={(e) => onChangeNameTC(e.target.value)}
          disabled
        />
        <Input
          className="ds-field-md"
          label="Bundle Name (English)"
          placeholder="Enter bundle name"
          value={nameEN}
          onChange={(e) => onChangeNameEN(e.target.value)}
          disabled
        />
        <NumberInput className="ds-field-md" label="Pre-Set QTY" value={presetQty} min={0} onChange={onChangePresetQty} />
      </div>
    </Modal>
  );
}
