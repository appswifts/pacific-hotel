import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Avatar } from "../components/ui/Avatar";
import { StarIcon } from "../components/ui/StarIcon";
import { PaginationDot } from "../components/ui/PaginationDot";
import { cn } from "../utils/cn";

const transition = { type: "spring", duration: 0.8 };

function StarsRow({ count = 5, delay = 0.5 }) {
  return (
    <motion.div aria-hidden="true" className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0, transition: { ...transition, delay: delay + i * 0.1 } }}
          exit={{ opacity: 0, scale: 0.9, y: 6, transition: { ...transition, delay: 0 } }}
        >
          <StarIcon />
        </motion.div>
      ))}
    </motion.div>
  );
}

export function TestimonialSection({
  reviews = [],
  brand,
  className,
}) {
  const [current, setCurrent] = useState(0);

  if (!reviews.length) return null;

  return (
    <section className={cn("py-16 md:py-24", brand ? "bg-bg-brand-section" : "bg-gradient-to-b from-brand-50/40 to-bg-bg-primary", className)}>
      <div className="mx-auto max-w-container px-4 md:px-8">
        <div className="flex flex-col items-center gap-10">
          <figure className="flex max-w-270 flex-col gap-8 text-center">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.blockquote
                key={current + "-quote"}
                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0, transition: { ...transition, delay: 0.4 } }}
                exit={{ opacity: 0, scale: 0.98, y: 20, transition: { ...transition, delay: 0.06 } }}
                className={cn(
                  "origin-bottom text-display-sm font-medium text-balance will-change-transform md:text-display-md",
                  brand ? "text-text-white" : "text-text-primary",
                )}
              >
                &ldquo;{reviews[current].quote}&rdquo;
              </motion.blockquote>

              <motion.figcaption
                key={current + "-author"}
                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0, transition: { ...transition, delay: 0.5 } }}
                exit={{ opacity: 0, scale: 0.98, y: 20, transition }}
                className="flex origin-bottom flex-col items-center gap-4 will-change-transform"
              >
                <div className="flex flex-col items-center gap-4">
                  {reviews[current].avatar && (
                    <Avatar
                      border
                      src={reviews[current].avatar}
                      alt={reviews[current].name}
                      size="lg"
                    />
                  )}
                  <div className="flex flex-col gap-1">
                    <p className={cn("text-lg font-semibold", brand ? "text-text-white" : "text-text-primary")}>
                      {reviews[current].name}
                    </p>
                    {reviews[current].title && (
                      <cite className={cn("text-md not-italic", brand ? "text-text-tertiary-on-brand" : "text-black")}>
                        {reviews[current].title}
                      </cite>
                    )}
                  </div>
                </div>
                <StarsRow count={reviews[current].stars || 5} />
              </motion.figcaption>
            </AnimatePresence>
          </figure>

          {reviews.length > 1 && (
            <PaginationDot
              page={current + 1}
              total={reviews.length}
              size="lg"
              onPageChange={(page) => setCurrent(page - 1)}
            />
          )}
        </div>
      </div>
    </section>
  );
}
