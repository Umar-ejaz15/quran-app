export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-5">
      <div className="relative w-14 h-14">
        <div
          className="absolute inset-0 rounded-full border-4"
          style={{ borderColor: 'var(--secondary)', opacity: 0.2 }}
        />
        <div
          className="absolute inset-0 rounded-full border-4 animate-spin"
          style={{ borderColor: 'var(--secondary)', borderTopColor: 'transparent' }}
        />
        <div
          className="absolute inset-2 rounded-full border-4"
          style={{ borderColor: 'var(--primary)', opacity: 0.15 }}
        />
        <div
          className="absolute inset-2 rounded-full border-4 animate-spin"
          style={{
            borderColor: 'var(--primary)',
            borderBottomColor: 'transparent',
            animationDirection: 'reverse',
            animationDuration: '0.85s',
          }}
        />
      </div>
      <p className="text-sm font-medium animate-pulse" style={{ color: 'var(--muted)' }}>
        Loading…
      </p>
    </div>
  );
}
