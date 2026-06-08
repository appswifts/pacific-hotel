export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-primary">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-28 w-28 animate-ping rounded-full bg-brand-200/40" />
        <div className="absolute h-20 w-20 animate-pulse rounded-full bg-brand-300/30" />
        <div className="relative flex h-16 w-16 items-center justify-center">
          <img src="/images/logo%20for%20white%20color.png" alt="Pacific Hotel" className="h-14 w-auto" />
        </div>
      </div>
      <div className="mt-8 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-500" style={{ animationDelay: "0ms" }} />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-500" style={{ animationDelay: "150ms" }} />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-500" style={{ animationDelay: "300ms" }} />
      </div>
      <p className="mt-4 text-sm font-medium text-black animate-pulse">
        Preparing your experience
      </p>
    </div>
  );
}
