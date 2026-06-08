import { cn } from "../utils/cn";

export function SocialProofSection({
  items = [],
  brand,
  className,
}) {
  if (!items.length) return null;

  return (
    <section className={cn("py-16 md:py-24", brand ? "bg-bg-brand-section" : "bg-gradient-to-b from-brand-50/40 to-bg-bg-primary", className)}>
      <div className="mx-auto max-w-container px-4 md:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {items.map((item) => (
            <div key={item.label} className="text-center">
              <div className={cn(
                "text-display-md font-bold md:text-display-lg",
                brand ? "text-text-white" : "text-text-primary",
              )}>
                {item.value}
              </div>
              <div className={cn(
                "text-sm md:text-md",
                brand ? "text-text-tertiary-on-brand" : "text-black",
              )}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
