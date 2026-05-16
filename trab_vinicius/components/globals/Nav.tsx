"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // Certifique-se de que tem esse helper do shadcn, se não tiver, avise!

export default function Nav() {
  const pathname = usePathname();

  const links = [
    { name: "Início", href: "/" },
    { name: "Currículos", href: "/sistema/paginas/curriculos" },
  ];

  return (
    <nav className="flex items-center gap-2">
      {links.map((link) => {
        const isActive = pathname === link.href;
        
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "relative px-4 py-2 text-sm font-bold transition-all duration-300 rounded-xl group",
              isActive 
                ? "text-primary" 
                : "text-muted-foreground hover:text-primary"
            )}
          >
            {/* Texto do Link */}
            <span className="relative z-10">{link.name}</span>

            {/* Fundo dinâmico (Aparece no Hover ou se estiver Ativo) */}
            {isActive ? (
              <div className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl shadow-[0_0_15px_rgba(34,197,94,0.1)] animate-in fade-in zoom-in-95 duration-300"></div>
            ) : (
              <div className="absolute inset-0 bg-primary/0 border border-transparent rounded-xl group-hover:bg-primary/5 group-hover:border-primary/10 transition-all duration-300"></div>
            )}

            {/* Linha Neon embaixo (Só aparece se estiver ativo) */}
            {isActive && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-primary shadow-[0_0_8px_rgba(34,197,94,0.8)] rounded-full"></div>
            )}
          </Link>
        );
      })}
    </nav>
  );
}