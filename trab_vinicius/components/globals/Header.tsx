import Link from "next/link";
import Nav from "./Nav";
import { FaLaptopCode } from "react-icons/fa";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-foreground">
          <FaLaptopCode className="text-blue-600 text-2xl" />
          <span>DevGestão</span>
        </Link>
        <Nav />
      </div>
    </header>
  );
}