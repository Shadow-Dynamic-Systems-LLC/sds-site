"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { parseCommand } from "@/lib/parseCommand";

const Console = () => {
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [history, setHistory] = useState(["> SDS Console Initialized."]);
  const [command, setCommand] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (isConsoleOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isConsoleOpen]);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command) return;

    const newHistory = [...history, `> ${command}`];
    const result = parseCommand(command, router);

    if (result === "clear_history") {
      setHistory(["> SDS Console Initialized."]);
    } else {
      setHistory([...newHistory, result]);
    }
    setCommand("");
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-deep-black/90 backdrop-blur-md font-mono border-b border-molten-orange transition-transform duration-500 ease-quint-out ${
        isConsoleOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div
        ref={historyRef}
        className="p-4 h-[calc(100%-3rem)] overflow-y-auto"
      >
        {history.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="absolute bottom-0 left-0 w-full">
        <input
          ref={inputRef}
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          className="w-full bg-transparent border-t border-molten-orange p-4 focus:outline-none"
          placeholder="Type 'help' for commands..."
        />
      </form>
    </div>
  );
};

export default Console;
