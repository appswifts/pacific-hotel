import { cn } from "../utils/cn";

export function SectionHeader({
  title,
  description,
  center = true,
  brand,
  className,
}) {
  return (
    <div className={cn(
      center && "text-center",
      "mb-14",
      className,
    )}>
      <h2 className={cn(
        "font-display text-3xl font-bold leading-tight tracking-[-0.03em] md:text-4xl lg:text-5xl",
        brand ? "text-white" : "text-black",
      )}>
        {title}
      </h2>
      {description && (
        <p className={cn(
          "max-w-lg mx-auto mt-3 leading-relaxed",
          brand ? "text-text-tertiary-on-brand" : "text-black",
        )}>
          {description}
        </p>
      )}
    </div>
  );
}
