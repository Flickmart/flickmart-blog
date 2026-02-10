"use client";

import { useEffect, useState } from "react";

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";

      // Only update if scroll direction changed and scrolled more than 10px
      if (
        direction !== scrollDirection &&
        Math.abs(scrollY - lastScrollY) > 10
      ) {
        setScrollDirection(direction);
      }

      setLastScrollY(scrollY > 0 ? scrollY : 0);
    };

    const onScroll = () => window.requestAnimationFrame(updateScrollDirection);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDirection, lastScrollY]);

  return scrollDirection;
}
