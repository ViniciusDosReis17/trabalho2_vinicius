"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const links = [
    { name: "Início", path: "/" },
    { name: "Currículos", path: "/sistema/paginas/curriculos" },
  ];

  return (
    <nav className="flex items-center gap-6">
      {links.map((link) => {
        const isActive = pathname === link.path || (link.path !== "/" && pathname.startsWith(link.path));

        return (
          <Link
            key={link.name}
            href={link.path}
            className={`text-sm font-medium transition-colors hover:text-blue-600 ${
              isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-gray-500"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}