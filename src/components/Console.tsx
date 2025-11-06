"use client";

import { useState, useEffect } from "react";

const Console = () => {
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "~") {
        setIsConsoleOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full bg-deep-black/90 backdrop-blur-md font-mono border-b border-molten-orange transition-transform duration-500 ease-quint-out ${
        isConsoleOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="p-4">
        <p>&gt; SDS Console Initialized.</p>
      </div>
    </div>
  );
};

export default Console;
