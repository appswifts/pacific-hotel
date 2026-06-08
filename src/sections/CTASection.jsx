import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { cn } from "../utils/cn";

export function CTASection({
  heading = "Start your free trial",
  text = "Join over 4,000+ startups already growing with Untitled.",
  primaryLabel = "Get started",
  primaryHref = "#",
  secondaryLabel = "Learn more",
  secondaryHref = "#",
  brand,
  className,
}) {
  return (
    <section className={cn("py-16 md:py-24", brand ? "bg-bg-brand-section" : "bg-gradient-to-b from-brand-50/40 to-bg-bg-primary", className)}>
      <div className="mx-auto max-w-container px-4 md:px-8">
        <div className="flex flex-col justify-center text-center">
          <h2 className={cn(
            "font-display text-4xl font-bold leading-tight tracking-[-0.03em] md:text-5xl",
            brand ? "text-white" : "text-black",
          )}>
            {heading}
          </h2>
          <p className={cn("mt-4 text-lg md:mt-5 md:text-xl leading-relaxed", brand ? "text-text-tertiary-on-brand" : "text-black")}>
            {text}
          </p>
          <div className="mt-8 flex flex-col-reverse gap-3 self-stretch md:mt-8 md:flex-row md:self-center">
            <Link to={secondaryHref}>
              <Button variant="secondary" size="xl">
                {secondaryLabel}
              </Button>
            </Link>
            <Link to={primaryHref}>
              <Button variant="default" size="xl">
                {primaryLabel}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
