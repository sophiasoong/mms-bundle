import { Modal, Radio, Select, Button, Dropzone } from '../ds.js';
import { storeOptionsByBusinessUnit } from '../mockData.js';

const BUSINESS_UNITS = [
  { value: 'HKTVmall', label: 'HKTVmall' },
  { value: 'ThePlace', label: 'ThePlace' },
];

const UPLOAD_METHODS = [
  { value: 'create', label: 'Batch Create' },
  { value: 'editAll', label: 'Batch Edit (All Field)' },
  { value: 'editPartial', label: 'Batch Edit (Partial Field)' },
];

const merchantOptions = [
  { value: '222', label: '222 - NewFlow Wayne Test Account' },
];

export function BatchUploadOptionModal({
  businessUnit,
  batchMethod,
  batchStore,
  onSelectBusinessUnit,
  onSelectMethod,
  onChangeStore,
  onClose,
  onNext,
}) {
  return (
    <Modal
      title="Batch Upload Option"
      size="md"
      onClose={onClose}
      actions={(
        <>
          <Button style="primary-outline" size="md" onClick={onClose}>Cancel</Button>
          <Button style="primary-solid" size="md" onClick={onNext}>Next</Button>
        </>
      )}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <div style={{ fontSize: 14, color: 'var(--text-body-primary-neutral)', marginBottom: 8, fontWeight: 500 }}>
            Select Business Unit
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            {BUSINESS_UNITS.map((bu) => (
              <div key={bu.value} style={{ flex: 1 }}>
                <Radio
                  card
                  label={bu.label}
                  checked={businessUnit === bu.value}
                  onChange={() => onSelectBusinessUnit(bu.value)}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 14, color: 'var(--text-body-primary-neutral)', marginBottom: 8, fontWeight: 500 }}>
            Select upload method
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 'var(--space-component-gap-lg)' }}>
            {UPLOAD_METHODS.map((m) => (
              <Radio
                key={m.value}
                label={m.label}
                checked={batchMethod === m.value}
                onChange={() => onSelectMethod(m.value)}
              />
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 14, color: 'var(--text-body-primary-neutral)', marginBottom: 8, fontWeight: 500 }}>
            Select Merchant and Store
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Select
              label="Merchant Name"
              placeholder="Merchant Name"
              options={merchantOptions}
              value={merchantOptions[0].value}
              disabled
            />
            <Select
              label="Store"
              placeholder="Store"
              options={storeOptionsByBusinessUnit[businessUnit] || []}
              value={batchStore}
              onChange={onChangeStore}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export function BatchFileModal({ mode, onClose, onSubmit }) {
  return (
    <Modal
      title={mode === 'create' ? 'Batch Create Bundle' : 'Batch Edit Bundle'}
      size="md"
      onClose={onClose}
      actions={(
        <>
          <Button style="primary-outline" size="md" onClick={onClose}>Cancel</Button>
          <Button style="primary-solid" size="md" onClick={onSubmit}>Submit</Button>
        </>
      )}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <div style={{ fontSize: 14, marginBottom: 8, color: 'var(--text-body-primary-neutral)' }}>
            1. Download Template File or Upload Batch File.
          </div>
          <Button style="primary-outline" size="sm">Download Template</Button>
        </div>
        <div>
          <div style={{ fontSize: 14, marginBottom: 4, color: 'var(--text-body-primary-neutral)' }}>
            2. Add your data to template file.
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-caption-primary)' }}>
            If using Excel, make sure to export or save as .xls or xlsx.
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-helper-error)', marginTop: 4 }}>
            Reminder: Do not modify template title fields, or error may occur.
          </div>
        </div>
        <div>
          <div style={{ fontSize: 14, marginBottom: 8, color: 'var(--text-body-primary-neutral)' }}>
            3. Upload Batch File.
          </div>
          <Dropzone label="Click or drag file to this area to upload" description="File only allow CSV" />
        </div>
      </div>
    </Modal>
  );
}
