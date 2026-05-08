import Link from "next/link";
import Nav from "./Nav";
import { FaLaptopCode } from "react-icons/fa";
import ThemeToggle from "../ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md shadow-sm transition-colors duration-300">
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-foreground group">
          <FaLaptopCode className="text-blue-600 text-2xl group-hover:scale-110 transition-transform" />
          <span>DevGestão</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Nav />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}