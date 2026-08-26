import { useEffect, useRef } from "react";

/**
 * useScrollReveal
 *
 * Attaches a native IntersectionObserver to the returned ref and toggles the
 * `is-visible` class (paired with the `.ctc-reveal` utility in theme.css)
 * once the element scrolls into view. Purely presentational — does not
 * affect data fetching or any existing conditional rendering logic.
 *
 * Usage:
 *   const ref = useScrollReveal();
 *   <section ref={ref} className="ctc-reveal features">...</section>
 */
export default function useScrollReveal(options = {}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Guard for older browsers / non-DOM environments.
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? "0px 0px -50px 0px",
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return elementRef;
}
