"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <button
      aria-label="Toggle dark mode"
      className="ml-4 p-2 rounded focus:outline-none focus:ring"
      onClick={() => setDark((d) => !d)}
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
} 