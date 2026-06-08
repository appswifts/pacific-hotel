import { cn } from "../../utils/cn";

export function PaginationDot({ page, total, size = "md", onPageChange }) {
  return (
    <nav aria-label="Pagination" className="flex items-center gap-1">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange?.(i + 1)}
          aria-current={page === i + 1 ? "page" : undefined}
          aria-label={`Page ${i + 1}`}
          className={cn(
            "rounded-full transition-all",
            size === "lg" ? "size-3" : "size-2",
            page === i + 1 ? "bg-brand-600" : "bg-neutral-300 hover:bg-neutral-400",
          )}
        />
      ))}
    </nav>
  );
}
