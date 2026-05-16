"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getCurriculos, deleteCurriculo } from "../../../../lib/storage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { FaSearch, FaPlus, FaTrash } from "react-icons/fa";
import { toast } from "sonner";

export default function ListaCurriculos() {
  const [busca, setBusca] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [curriculos, setCurriculos] = useState<any[]>([]);

  const carregarDados = () => {
    setCurriculos(getCurriculos());
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleExcluir = (id: string, nome: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o currículo de ${nome}?`)) {
      deleteCurriculo(id);
      carregarDados();
      toast.success("Currículo removido", { 
        style: { background: '#1a1a1a', color: '#22c55e', border: '1px solid #22c55e33' }
      });
    }
  };

  const curriculosFiltrados = curriculos.filter((curriculo) => {
    const termo = busca.toLowerCase();
    return (
      curriculo.nome.toLowerCase().includes(termo) ||
      curriculo.cargoDesejado.toLowerCase().includes(termo)
    );
  });

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
            Gerenciar <span className="text-primary">Talentos</span>
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Lista de currículos cadastrados na base DevGestão.
          </p>
        </div>
        <Link href="/sistema/paginas/curriculos/novo">
          <Button className="bg-primary hover:bg-primary/80 text-primary-foreground shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all hover:scale-105 flex items-center gap-2 h-11 px-6 rounded-xl font-bold">
            <FaPlus /> Novo Currículo
          </Button>
        </Link>
      </div>

      {/* Barra de Busca com foco Verde */}
      <div className="relative mb-10 max-w-xl group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FaSearch className="text-primary group-focus-within:scale-110 transition-transform" />
        </div>
        <Input
          type="text"
          placeholder="Buscar por nome ou cargo..."
          className="pl-11 h-12 bg-card/50 backdrop-blur-sm border-border focus:border-primary/50 focus:ring-primary/20 transition-all text-base rounded-xl shadow-sm"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {curriculosFiltrados.length > 0 ? (
          curriculosFiltrados.map((curriculo) => (
            <Card key={curriculo.id} className="flex flex-col h-full bg-card/50 backdrop-blur-md border-border hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:border-primary/40 group overflow-hidden relative">
              {/* Detalhe estético no topo do card */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <CardHeader>
                <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">{curriculo.nome}</CardTitle>
                <CardDescription className="font-semibold text-primary/80 text-base">
                  {curriculo.cargoDesejado}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-muted-foreground line-clamp-3 mb-6 leading-relaxed">
                  {curriculo.resumoProfissional}
                </p>
                <div className="mt-auto pt-6 border-t border-border/50 flex gap-3">
                  <Link href={`/sistema/paginas/curriculos/${curriculo.id}`} className="flex-1">
                    <Button variant="outline" className="w-full border-border hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all rounded-lg font-medium">
                      Ver Detalhes
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleExcluir(curriculo.id, curriculo.nome)}
                    className="border-border hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50 transition-all shrink-0 rounded-lg"
                  >
                    <FaTrash className="text-sm" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-muted-foreground bg-card/20 rounded-3xl border-2 border-dashed border-border/50">
            <FaSearch className="text-5xl mb-4 opacity-10 text-primary" />
            <p className="text-lg font-medium">Nenhum talento encontrado para &quot;<span className="text-primary">{busca}</span>&quot;.</p>
          </div>
        )}
      </div>
    </div>
  );
}