import { useRef, useState } from 'react';
import { Modal, Radio, Select, Button, Dropzone, Icon } from '../ds.js';
import { storeOptionsByBusinessUnit } from '../mockData.js';

function SuccessCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9.2" stroke="var(--feedback-toast-icon-success, #52c41a)" strokeWidth="1.6" />
      <path d="M6 10.2l2.5 2.5L14 7.2" stroke="var(--feedback-toast-icon-success, #52c41a)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function FailedCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9.2" stroke="var(--feedback-toast-icon-danger, #f5222d)" strokeWidth="1.6" />
      <path d="M7 7l6 6M13 7l-6 6" stroke="var(--feedback-toast-icon-danger, #f5222d)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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

function mockUploadResult() {
  const total = Math.floor(Math.random() * 15) + 15;
  const failed = Math.floor(Math.random() * 4);
  return { total, failed, success: total - failed };
}

export function BatchFileModal({ mode, onClose, onSubmit }) {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const acceptFile = (candidate) => {
    const name = candidate?.name.toLowerCase() ?? '';
    if (name.endsWith('.xls') || name.endsWith('.xlsx')) {
      setFile(candidate);
      setUploadResult(mockUploadResult());
    }
  };

  const handleInputChange = (e) => {
    acceptFile(e.target.files?.[0]);
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    acceptFile(e.dataTransfer.files?.[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleReset = () => {
    setFile(null);
    setUploadResult(null);
  };

  return (
    <Modal
      title={mode === 'create' ? 'Batch Create Bundle' : 'Batch Edit Bundle'}
      size="md"
      onClose={onClose}
      actions={(
        <>
          <Button style="primary-outline" size="md" onClick={onClose}>Cancel</Button>
          <Button
            style="primary-solid"
            size="md"
            disabled={!uploadResult}
            onClick={() => onSubmit({ file, ...uploadResult })}
          >
            Submit
          </Button>
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

          {uploadResult ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div
                style={{
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--interactive-dropzone-border-filled)',
                  background: 'var(--interactive-dropzone-surface-filled)',
                  padding: '24px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 16, color: 'var(--interactive-dropzone-label-default)' }}>
                    Upload Result
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--interactive-dropzone-description-default)' }}>
                    Please check upload result
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 24 }}>
                    <SuccessCircleIcon />
                    <span style={{ flex: 1, fontSize: 14, color: 'var(--text-body-primary-neutral)' }}>Success</span>
                    <span style={{ fontSize: 14, color: 'var(--text-body-primary-neutral)' }}>{uploadResult.success}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 24 }}>
                    <FailedCircleIcon />
                    <span style={{ flex: 1, fontSize: 14, color: 'var(--text-body-primary-neutral)' }}>Failed</span>
                    <span style={{ fontSize: 14, color: 'var(--text-body-primary-neutral)' }}>{uploadResult.failed}</span>
                  </div>
                </div>

                <div style={{ fontSize: 14, color: 'var(--interactive-dropzone-description-default)', textAlign: 'right' }}>
                  Total bundle SKU(s): {uploadResult.total}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 24, padding: '0 8px', minWidth: 0 }}>
                <Icon name="PaperClip2" size={16} />
                <span
                  style={{
                    flex: 1,
                    fontSize: 14,
                    color: 'var(--text-body-primary-neutral)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {file?.name}
                </span>
                <button
                  type="button"
                  onClick={handleReset}
                  style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer', display: 'flex', flexShrink: 0 }}
                  aria-label="Remove file"
                >
                  <Icon name="DeleteOutlined" size={16} />
                </button>
              </div>

              <div style={{ display: 'flex', gap: 16, marginTop: 4 }}>
                {uploadResult.failed > 0 && (
                  <Button style="primary-outline" size="sm">Download Error Report</Button>
                )}
                <Button style="primary-outline" size="sm" onClick={handleReset}>Upload Again</Button>
              </div>
            </div>
          ) : (
            <>
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                style={{
                  borderRadius: 'var(--radius-md)',
                  outline: isDragOver ? '2px solid var(--interactive-button-border-primary-solid-default)' : 'none',
                  outlineOffset: -2,
                }}
              >
                <Dropzone
                  label="Click or drag file to this area to upload"
                  description="File only allow XLS or XLSX"
                  onClick={() => fileInputRef.current?.click()}
                />
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xls,.xlsx"
                onChange={handleInputChange}
                style={{ display: 'none' }}
              />
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
