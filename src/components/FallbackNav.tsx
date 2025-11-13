"use client";

import { useState } from "react";
import Link from "next/link";

const FallbackNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/framework", label: "Framework" },
    { href: "/lighthouse", label: "Lighthouse" },
    { href: "/lab", label: "Lab" },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed top-4 right-4 z-50 font-heading text-molten-orange ${
          isOpen ? "hidden" : ""
        }`}
      >
        MENU
      </button>

      <div
        className={`fixed inset-0 z-40 bg-deep-black/95 backdrop-blur-sm transition-opacity duration-300 ease-quint-out ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-heading text-brand-white text-4xl my-4 hover:text-molten-orange transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 font-heading text-brand-white"
          >
            CLOSE
          </button>
        </div>
      </div>
    </>
  );
};

export default FallbackNav;
