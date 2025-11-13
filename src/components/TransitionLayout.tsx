"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const TransitionLayout = ({ children }) => {
  const pathname = usePathname();
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "quint-out" }
      );
    }
  }, [pathname]);

  return <div ref={contentRef}>{children}</div>;
};

export default TransitionLayout;
