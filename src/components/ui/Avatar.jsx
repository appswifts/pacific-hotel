import { cn } from "../../utils/cn";

const sizes = {
  sm: "size-6",
  md: "size-8",
  lg: "size-10",
  xl: "size-12",
};

export function Avatar({ src, alt, size = "md", border, className }) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        "shrink-0 rounded-full object-cover",
        sizes[size] || sizes.md,
        border && "ring-2 ring-white",
        className,
      )}
    />
  );
}
