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
        <div className="h-8 w-8 bg-blue-500 rounded-full animate-ping mb-4"></div>
        <p className="text-muted-foreground font-medium animate-pulse">Carregando perfil...</p>
      </div>
    );
  }

  if (!curriculo) {
    return (
      <div className="container mx-auto py-20 text-center flex flex-col items-center justify-center min-h-[60vh]">
        <div className="p-6 bg-card/50 backdrop-blur-md rounded-2xl border border-dashed border-border flex flex-col items-center max-w-md w-full">
          <h1 className="text-2xl font-bold mb-2 text-foreground">Candidato não encontrado</h1>
          <p className="text-muted-foreground mb-6">O currículo que você tentou acessar não existe na base de dados.</p>
          <Link href="/sistema/paginas/curriculos">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">Voltar para a listagem</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl animate-in fade-in duration-500">
      
      {/* Botões do Topo (Escondidos na hora de gerar o PDF) */}
      <div className="mb-8 relative z-10 flex gap-4 print:hidden">
        <Link href="/sistema/paginas/curriculos">
          <Button variant="outline" className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border-border hover:bg-accent transition-all">
            <FaArrowLeft /> Voltar
          </Button>
        </Link>
        <Button onClick={() => window.print()} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-lg shadow-blue-500/20">
          <FaPrint /> Gerar PDF
        </Button>
      </div>
      
      <div className="mb-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card/40 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-border shadow-lg shadow-blue-500/5 print:border-none print:shadow-none print:p-0">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">{curriculo.nome}</h1>
            <p className="text-xl md:text-2xl text-blue-500 font-semibold mt-2">{curriculo.cargoDesejado}</p>
          </div>
          
          <div className="w-28 h-28 bg-background rounded-full border-2 border-blue-500/30 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.15)] shrink-0 print:border-slate-300">
             {curriculo.imagemUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={curriculo.imagemUrl} alt={curriculo.nome} className="w-full h-full object-cover" />
             ) : (
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Sem Foto</span>
             )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        <div className="space-y-8">
          <Card className="bg-card/50 backdrop-blur-sm border-border shadow-md hover:border-blue-500/30 transition-colors print:border-none print:shadow-none">
            <CardHeader className="pb-4 print:px-0">
              <CardTitle className="text-lg flex items-center gap-2 border-b border-border/50 pb-3">
                <FaIdCard className="text-blue-500" /> Contato
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 print:px-0">
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors print:p-0">
                <div className="p-2 bg-blue-500/10 rounded-md text-blue-500 print:bg-transparent print:p-0"><FaEnvelope /></div>
                <span className="text-sm font-medium">{curriculo.email}</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors print:p-0">
                <div className="p-2 bg-blue-500/10 rounded-md text-blue-500 print:bg-transparent print:p-0"><FaPhone /></div>
                <span className="text-sm font-medium">{curriculo.telefone}</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors print:p-0">
                <div className="p-2 bg-blue-500/10 rounded-md text-blue-500 print:bg-transparent print:p-0"><FaIdCard /></div>
                <span className="text-sm font-medium">{curriculo.cpf}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border shadow-md hover:border-blue-500/30 transition-colors print:border-none print:shadow-none">
            <CardHeader className="pb-4 print:px-0">
              <CardTitle className="text-lg flex items-center gap-2 border-b border-border/50 pb-3">
                <FaCode className="text-blue-500" /> Habilidades Técnicas
              </CardTitle>
            </CardHeader>
            <CardContent className="print:px-0">
              <div className="flex flex-wrap gap-2">
                {curriculo.habilidades?.split(",").map((habilidade: string, index: number) => (
                  <span key={index} className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow-[0_0_10px_rgba(59,130,246,0.05)] print:border-slate-300 print:text-slate-800">
                    {habilidade.trim()}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-card/50 backdrop-blur-sm border-border shadow-md hover:border-blue-500/30 transition-colors print:border-none print:shadow-none">
            <CardContent className="pt-6 print:px-0">
              <p className="text-muted-foreground leading-relaxed text-base print:text-black">
                {curriculo.resumoProfissional}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border shadow-md hover:border-blue-500/30 transition-colors print:border-none print:shadow-none">
            <CardHeader className="pb-4 print:px-0">
              <CardTitle className="text-lg flex items-center gap-2 border-b border-border/50 pb-3">
                <FaBriefcase className="text-blue-500" /> Experiência Profissional
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-2 print:px-0">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {curriculo.experiencias?.map((exp: any, index: number) => (
                <div key={index} className="relative pl-6 border-l-2 border-blue-500/30 before:absolute before:-left-[9px] before:top-1.5 before:h-4 before:w-4 before:rounded-full before:bg-background before:border-2 before:border-blue-500 print:border-slate-300 print:before:border-slate-500">
                  <h3 className="text-lg font-bold text-foreground transition-colors print:text-black">{exp.cargo}</h3>
                  <h4 className="text-sm text-blue-500 font-semibold mb-2 print:text-slate-600">{exp.empresa}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed print:text-black">{exp.descricao}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border shadow-md hover:border-blue-500/30 transition-colors print:border-none print:shadow-none">
            <CardHeader className="pb-4 print:px-0">
              <CardTitle className="text-lg flex items-center gap-2 border-b border-border/50 pb-3">
                <FaGraduationCap className="text-blue-500" /> Formação Acadêmica
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-2 print:px-0">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {curriculo.formacoes?.map((form: any, index: number) => (
                <div key={index} className="relative pl-6 border-l-2 border-cyan-500/30 before:absolute before:-left-[9px] before:top-1.5 before:h-4 before:w-4 before:rounded-full before:bg-background before:border-2 before:border-cyan-500 print:border-slate-300 print:before:border-slate-500">
                  <h3 className="text-lg font-bold text-foreground transition-colors print:text-black">{form.curso}</h3>
                  <p className="text-sm text-muted-foreground mt-1 font-medium print:text-slate-600">{form.instituicao}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}