import Link from "next/link";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { FaAddressCard, FaCheckCircle, FaRocket, FaArrowRight } from "react-icons/fa";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden">
      {/* Background Pattern - Grid com pontinhos levemente roxos/verdes */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(139,92,246,0.15)_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      {/* Luz de fundo radial (Glow) usando Roxo escuro para dar a vibe do cenário */}
      <div className="absolute top-0 z-[-1] h-screen w-full bg-background dark:bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(109,40,217,0.25),rgba(255,255,255,0))]"></div>

      {/* Seção Principal (Hero) */}
      <section className="w-full py-20 md:py-32 flex flex-col items-center text-center px-4 mt-10">
        {/* Badge do topo em Verde (primary) */}
        <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse shadow-[0_0_8px_var(--theme-primary)]"></span>
          Sistema de Gestão v1.0
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 max-w-4xl">
          Gestão de Currículos <br className="hidden md:block" />
          {/* Gradiente Verde para Roxo */}
          <span className="bg-gradient-to-r from-primary via-emerald-400 to-purple-500 bg-clip-text text-transparent drop-shadow-sm">
            Simplificada
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-[600px] mb-10 leading-relaxed">
          Organize, filtre e gerencie talentos em uma plataforma com arquitetura moderna e responsiva. Otimize seu processo de recrutamento.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/sistema/paginas/curriculos">
            {/* Botão Principal em Verde LOUD */}
            <Button size="lg" className="h-12 px-8 text-base bg-primary hover:bg-primary/80 text-primary-foreground shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all hover:scale-105 group">
              Acessar o Sistema
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/sistema/paginas/curriculos/novo">
            {/* Botão Secundário outline com hover roxo */}
            <Button size="lg" variant="outline" className="h-12 px-8 text-base border-border bg-background/50 backdrop-blur-md hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all hover:scale-105">
              Cadastrar Candidato
            </Button>
          </Link>
        </div>
      </section>

      {/* Seção de Benefícios */}
      <section className="w-full py-20 max-w-6xl mx-auto px-4 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* CARD 1 */}
          <Card className="bg-card/50 backdrop-blur-sm border-border hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:border-primary/50 group">
            <CardHeader className="flex flex-col items-center text-center pb-2">
              <div className="p-3 bg-primary/10 rounded-2xl mb-4 text-primary group-hover:scale-110 transition-transform">
                <FaRocket className="text-3xl" />
              </div>
              <CardTitle className="text-xl">Interface Moderna</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base text-muted-foreground leading-relaxed">
                Navegação fluida e responsiva, garantindo a melhor experiência do usuário em qualquer dispositivo.
              </CardDescription>
            </CardContent>
          </Card>

          {/* CARD 2 */}
          <Card className="bg-card/50 backdrop-blur-sm border-border hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:border-purple-500/50 group">
            <CardHeader className="flex flex-col items-center text-center pb-2">
              <div className="p-3 bg-purple-500/10 rounded-2xl mb-4 text-purple-400 group-hover:scale-110 transition-transform">
                <FaAddressCard className="text-3xl" />
              </div>
              <CardTitle className="text-xl">Gestão Centralizada</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base text-muted-foreground leading-relaxed">
                Visualize todos os currículos em formato de cards interativos, facilitando a análise de perfis.
              </CardDescription>
            </CardContent>
          </Card>

          {/* CARD 3 */}
          <Card className="bg-card/50 backdrop-blur-sm border-border hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:border-primary/50 group">
            <CardHeader className="flex flex-col items-center text-center pb-2">
              <div className="p-3 bg-primary/10 rounded-2xl mb-4 text-primary group-hover:scale-110 transition-transform">
                <FaCheckCircle className="text-3xl" />
              </div>
              <CardTitle className="text-xl">Validação Rigorosa</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base text-muted-foreground leading-relaxed">
                Formulários dinâmicos e seguros com validação em tempo real e feedback visual instantâneo.
              </CardDescription>
            </CardContent>
          </Card>

        </div>
      </section>
    </div>
  );
}