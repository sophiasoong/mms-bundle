import { useState } from 'react';
import { Breadcrumb, PageTitle, Button, Select, Step, Footer, Searchbar, Table, Radio, Pagination, Icon } from '../ds.js';
import { storefrontOptions, readyMethodOptions, parentSkus } from '../mockData.js';

const CREATE_STEPS = [
  { label: 'Select Store and Type' },
  { label: 'Select Parent SKU' },
  { label: 'Select Child SKU' },
];

const PARENT_SKU_COLUMNS = [
  { key: 'select', label: '' },
  { key: 'image', label: 'Image' },
  { key: 'skuId', label: 'SKU ID' },
  { key: 'nameCH', label: 'SKU Name (CH)' },
  { key: 'nameEN', label: 'SKU Name (EN)' },
  { key: 'ready', label: 'Product Ready Method' },
];

function RequiredLabel({ children }) {
  return (
    <>
      {children} <span style={{ color: 'var(--text-required-default)' }}>*</span>
    </>
  );
}

export default function CreateBundlePage({
  onCancel,
  onSave,
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [storefrontCode, setStorefrontCode] = useState('');
  const [readyMethod, setReadyMethod] = useState('');

  const [skuIdQuery, setSkuIdQuery] = useState('');
  const [selectedParentSku, setSelectedParentSku] = useState(null);
  const [skuPage, setSkuPage] = useState(1);

  const handleNext = () => setCurrentStep(s => Math.min(s + 1, CREATE_STEPS.length - 1));
  const handleBack = () => setCurrentStep(s => Math.max(s - 1, 0));

  const filteredParentSkus = parentSkus.filter((p) =>
    p.skuId.toLowerCase().includes(skuIdQuery.trim().toLowerCase())
  );

  const parentSkuRows = filteredParentSkus.map((p) => ({
    select: <Radio checked={selectedParentSku === p.skuId} onChange={() => setSelectedParentSku(p.skuId)} />,
    image: (
      <img
        src={p.image}
        alt={p.nameEN}
        width={40}
        height={40}
        style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
      />
    ),
    skuId: p.skuId,
    nameCH: p.nameCH,
    nameEN: p.nameEN,
    ready: p.ready,
  }));

  return (
    <>
      <Breadcrumb items={[{ label: 'MMS' }, { label: 'Product & Inventory' }, { label: 'Bundle Setting' }, { label: 'Create Bundle Set' }]} />

      <PageTitle
        className="page-title-fig"
        title="Create Bundle Set"
      />

      <Step steps={CREATE_STEPS} current={currentStep} />

      {currentStep === 0 && (
        <div
          style={{
            marginTop: 'var(--space-layout-section-gap-sm)',
            marginBottom: 'var(--space-layout-section-gap-sm)',
            background: 'var(--surface-card-surface-default, #fff)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-component-padding-lg)',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
          }}
        >
          <Select
            label={<RequiredLabel>Storefront Code</RequiredLabel>}
            placeholder="Select storefront code"
            options={storefrontOptions}
            value={storefrontCode}
            onChange={setStorefrontCode}
          />
          <Select
            label={<RequiredLabel>Product Ready Method</RequiredLabel>}
            placeholder="Select product ready method"
            options={readyMethodOptions}
            value={readyMethod}
            onChange={setReadyMethod}
          />
          <Select
            label={<RequiredLabel>Storage Type</RequiredLabel>}
            placeholder="Select storage type"
            options={[]}
            disabled
          />
        </div>
      )}

      {currentStep === 1 && (
        <div
          style={{
            marginTop: 'var(--space-layout-section-gap-sm)',
            marginBottom: 'var(--space-layout-section-gap-sm)',
            background: 'var(--surface-card-surface-default, #fff)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-component-padding-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 280 }}>
              <Searchbar
                className="ds-searchbar-md"
                placeholder="Search by SKU ID"
                value={skuIdQuery}
                onChange={(e) => { setSkuIdQuery(e.target.value); setSkuPage(1); }}
              />
            </div>
            <Button
              style="primary-ghost"
              size="md"
              onClick={() => { setSkuIdQuery(''); setSkuPage(1); }}
            >
              Reset
            </Button>
          </div>

          <Table columns={PARENT_SKU_COLUMNS} rows={parentSkuRows} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 'var(--text-xs-size)', color: 'var(--text-caption-primary)' }}>
              {filteredParentSkus.length === 0 ? '0 results' : `1-${filteredParentSkus.length} of ${filteredParentSkus.length} results`}
            </span>
            <Pagination current={skuPage} total={1} onChange={setSkuPage} />
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div
          style={{
            marginTop: 'var(--space-layout-section-gap-sm)',
            marginBottom: 'var(--space-layout-section-gap-sm)',
            background: 'var(--surface-card-surface-default, #fff)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-component-padding-lg)',
          }}
        >
          <span style={{ fontSize: 'var(--text-sm-size)', color: 'var(--text-caption-primary)' }}>Select Child SKU — coming soon</span>
        </div>
      )}

      <Footer
        left={currentStep > 0 && (
          <Button style="primary-ghost" size="md" leadingIcon={<Icon name="Back" size={16} />} onClick={handleBack}>Back</Button>
        )}
        right={(
          <>
            <Button style="primary-outline" size="md" onClick={onCancel}>Cancel</Button>
            <Button style="primary-solid" size="md" onClick={handleNext}>Next</Button>
          </>
        )}
      />
    </>
  );
}
