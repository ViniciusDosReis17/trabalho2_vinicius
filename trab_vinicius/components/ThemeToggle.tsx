"use client";

import * as React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative rounded-xl w-10 h-10 border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 overflow-hidden"
    >
      <div className="relative h-5 w-5">
        <FaSun className="absolute inset-0 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 text-yellow-500" />
        <FaMoon className="absolute inset-0 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 text-primary" />
      </div>
      <span className="sr-only">Trocar Tema</span>
    </Button>
  );
}