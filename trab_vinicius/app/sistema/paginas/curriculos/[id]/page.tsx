"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaEnvelope, FaPhone, FaIdCard, FaBriefcase, FaGraduationCap, FaCode, FaPrint } from "react-icons/fa";
import { getCurriculos } from "../../../../../lib/storage";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card";
import { Button } from "../../../../../components/ui/button";

export default function DetalhesCurriculo() {
  const params = useParams();
  const id = params.id as string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [curriculo, setCurriculo] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (id) {
      const todosCurriculos = getCurriculos();
      const candidatoEncontrado = todosCurriculos.find((c: any) => String(c.id) === String(id));
      setCurriculo(candidatoEncontrado);
      setCarregando(false);
    }
  }, [id]);

  if (carregando) {
    return (
      <div className="container mx-auto py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <div className="h-8 w-8 bg-primary rounded-full animate-ping mb-4"></div>
        <p className="text-muted-foreground font-medium animate-pulse">Carregando perfil...</p>
      </div>
    );
  }

  if (!curriculo) {
    return (
      <div className="container mx-auto py-20 text-center flex flex-col items-center justify-center min-h-[60vh]">
        <div className="p-6 bg-card/50 backdrop-blur-md rounded-2xl border border-dashed border-border flex flex-col items-center max-w-md w-full">
          <h1 className="text-2xl font-bold mb-2 text-foreground">Candidato não encontrado</h1>
          <Link href="/sistema/paginas/curriculos">
            <Button className="bg-primary hover:bg-primary/80 text-primary-foreground w-full">Voltar para a listagem</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl animate-in fade-in duration-500">
      
      <div className="mb-8 relative z-10 flex gap-4 print:hidden">
        <Link href="/sistema/paginas/curriculos">
          <Button variant="outline" className="gap-2 bg-card/50 border-border hover:bg-primary/10 hover:text-primary transition-all">
            <FaArrowLeft /> Voltar
          </Button>
        </Link>
        <Button onClick={() => window.print()} className="gap-2 bg-primary hover:bg-primary/80 text-primary-foreground shadow-lg shadow-primary/20">
          <FaPrint /> Gerar PDF
        </Button>
      </div>
      
      <div className="mb-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card/40 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-border shadow-lg print:border-none">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">{curriculo.nome}</h1>
            <p className="text-xl md:text-2xl text-primary font-bold mt-2">{curriculo.cargoDesejado}</p>
          </div>
          
          <div className="w-28 h-28 bg-background rounded-full border-2 border-primary/30 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(34,197,94,0.2)] shrink-0">
             {curriculo.imagemUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={curriculo.imagemUrl} alt={curriculo.nome} className="w-full h-full object-cover" />
             ) : (
                <span className="text-xs text-muted-foreground font-medium uppercase">Sem Foto</span>
             )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        <div className="space-y-8">
          <Card className="bg-card/50 backdrop-blur-sm border-border print:border-none">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2 border-b border-border/50 pb-3">
                <FaIdCard className="text-primary" /> Contato
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-2">
                <div className="p-2 bg-primary/10 rounded-md text-primary"><FaEnvelope /></div>
                <span className="text-sm font-medium">{curriculo.email}</span>
              </div>
              <div className="flex items-center gap-3 p-2">
                <div className="p-2 bg-primary/10 rounded-md text-primary"><FaPhone /></div>
                <span className="text-sm font-medium">{curriculo.telefone}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border print:border-none">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2 border-b border-border/50 pb-3">
                <FaCode className="text-primary" /> Habilidades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {curriculo.habilidades?.split(",").map((habilidade: string, index: number) => (
                  <span key={index} className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-bold">
                    {habilidade.trim()}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-card/50 backdrop-blur-sm border-border print:border-none">
            <CardContent className="pt-6">
              <p className="text-muted-foreground leading-relaxed">{curriculo.resumoProfissional}</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border print:border-none">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 border-b border-border/50 pb-3 font-bold">
                <FaBriefcase className="text-primary" /> Experiência Profissional
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {curriculo.experiencias?.map((exp: any, index: number) => (
                <div key={index} className="relative pl-6 border-l-2 border-primary/30 before:absolute before:-left-[9px] before:top-1.5 before:h-4 before:w-4 before:rounded-full before:bg-background before:border-2 before:border-primary">
                  <h3 className="text-lg font-bold text-foreground">{exp.cargo}</h3>
                  <h4 className="text-sm text-primary font-semibold mb-2">{exp.empresa}</h4>
                  <p className="text-sm text-muted-foreground">{exp.descricao}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}