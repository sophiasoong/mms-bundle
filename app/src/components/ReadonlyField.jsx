export default function ReadonlyField({ label, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-component-gap-xs)', flex: 1, minWidth: 0 }}>
      <span style={{ fontSize: 'var(--text-sm-size)', lineHeight: 'var(--text-sm-line-height)', color: 'var(--text-label-primary)' }}>{label}</span>
      <span
        style={{
          fontSize: 'var(--text-sm-size)',
          lineHeight: 'var(--text-sm-line-height)',
          height: 'var(--component-height-md)',
          display: 'flex',
          alignItems: 'center',
          color: 'var(--text-body-primary-neutral)',
        }}
      >
        {value}
      </span>
    </div>
  );
}
