export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-100 gap-4">
      {/* Dual-ring spinner: outer gold, inner green */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-(--secondary)/25 rounded-full" />
        <div className="absolute inset-0 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
        <div className="absolute inset-2 border-4 border-primary/20 rounded-full" />
        <div className="absolute inset-2 border-4 border-primary border-b-transparent rounded-full animate-spin"
             style={{ animationDirection: 'reverse', animationDuration: '0.9s' }} />
      </div>
      <p className="text-sm text-(--accent) animate-pulse">Loading…</p>
    </div>
  );
}
