import Link from "next/link";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { FaAddressCard, FaCheckCircle, FaRocket } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Seção Principal (Hero) */}
      <section className="w-full py-20 md:py-32 bg-background flex flex-col items-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
          Gestão de Currículos <span className="text-blue-600">Simplificada</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-[600px] mb-8">
          Organize, filtre e gerencie talentos em uma plataforma moderna e responsiva. 
          A solução ideal para otimizar o seu processo de recrutamento.
        </p>
        <Link href="/sistema/paginas/curriculos">
          <Button size="lg" className="text-base bg-blue-600 hover:bg-blue-700 text-white">
            Acessar o Sistema
          </Button>
        </Link>
      </section>

      {/* Seção de Benefícios */}
      <section className="w-full py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Benefícios do Sistema</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-card text-card-foreground">
            <CardHeader className="flex flex-col items-center text-center">
              <FaRocket className="text-4xl text-blue-500 mb-4" />
              <CardTitle>Interface Moderna</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base text-muted-foreground">
                Navegação fluida e responsiva, garantindo a melhor experiência do usuário em qualquer dispositivo.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground">
            <CardHeader className="flex flex-col items-center text-center">
              <FaAddressCard className="text-4xl text-blue-500 mb-4" />
              <CardTitle>Gestão Centralizada</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base text-muted-foreground">
                Visualize todos os currículos em formato de cards interativos, facilitando a análise de perfis.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground">
            <CardHeader className="flex flex-col items-center text-center">
              <FaCheckCircle className="text-4xl text-blue-500 mb-4" />
              <CardTitle>Validação Rigorosa</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base text-muted-foreground">
                Formulários dinâmicos e seguros com validação em tempo real e feedback visual instantâneo.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}