import { cn } from "../utils/cn";

export function FeaturesSection({
  items = [],
  columns = 3,
  className,
}) {
  if (!items.length) return null;

  return (
    <section className={cn("bg-gradient-to-b from-brand-50/40 to-bg-bg-primary py-16 md:py-24", className)}>
      <div className="mx-auto w-full max-w-container px-4 md:px-8">
        <ul className={cn(
          "grid w-full grid-cols-1 justify-items-center gap-x-8 gap-y-10 sm:grid-cols-2 md:gap-y-16",
          columns === 3 && "lg:grid-cols-3",
          columns === 4 && "lg:grid-cols-4",
          columns === 2 && "lg:grid-cols-2",
        )}>
          {items.map((item) => (
            <li key={item.title} className="w-full">
              <FeatureCard icon={item.icon} title={item.title} subtitle={item.subtitle} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, subtitle }) {
  const isIconComponent = Icon && typeof Icon !== "string";
  return (
    <div className="flex flex-col items-center text-center gap-4">
      {isIconComponent && (
        <div className="flex size-12 items-center justify-center border border-black/10 bg-bg-secondary">
          <Icon className="size-6 text-icon-fg-brand" />
        </div>
      )}
      {typeof Icon === "string" && (
        <div className="text-4xl">{Icon}</div>
      )}
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold text-black tracking-[-0.02em]">{title}</h3>
        <p className="text-lg text-black max-w-xs leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
}
