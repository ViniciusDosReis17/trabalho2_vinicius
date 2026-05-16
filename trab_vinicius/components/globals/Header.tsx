import Link from "next/link";
import Nav from "./Nav";
import { FaLaptopCode } from "react-icons/fa";
import ThemeToggle from "../ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md transition-all duration-300">
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-foreground group">
          {/* Ícone agora em Verde LOUD */}
          <FaLaptopCode className="text-primary text-2xl group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.5)] transition-all" />
          <span className="tracking-tight">Dev<span className="text-primary">Gestão</span></span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Nav />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}