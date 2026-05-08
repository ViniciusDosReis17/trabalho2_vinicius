"use client";

import * as React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Previne erro de hidratação (renderiza só depois de montar no cliente)
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full w-10 h-10 border-border bg-background/50 backdrop-blur-sm hover:bg-accent transition-all"
    >
      {theme === "light" ? (
        <FaMoon className="h-5 w-5 text-blue-600 hover:rotate-12 transition-transform" />
      ) : (
        <FaSun className="h-5 w-5 text-yellow-500 hover:rotate-90 transition-transform" />
      )}
      <span className="sr-only">Alternar tema</span>
    </Button>
  );
}