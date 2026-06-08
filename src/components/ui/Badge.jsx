import { cn } from "../../utils/cn";

const variants = {
  "pill-color":
    "bg-bg-brand-primary text-text-brand-secondary",
  "badge-color":
    "bg-bg-brand-primary text-text-brand-secondary rounded-md",
  "badge-modern":
    "bg-bg-brand-solid text-text-white shadow-sm rounded-md",
};

const sizes = {
  sm: "px-1.5 py-0.5 text-xs font-medium",
  md: "px-2 py-0.5 text-xs font-medium",
  lg: "px-2.5 py-1 text-sm font-medium",
};

export function Badge({ children, type = "badge-color", size = "md", className }) {
  return (
    <span className={cn("inline-flex items-center gap-1", variants[type] || variants["badge-color"], sizes[size] || sizes.md, className)}>
      {children}
    </span>
  );
}
