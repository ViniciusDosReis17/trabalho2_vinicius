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
    // Confirmação nativa simples antes de excluir
    if (window.confirm(`Tem certeza que deseja excluir o currículo de ${nome}?`)) {
      deleteCurriculo(id);
      carregarDados(); // Atualiza a lista na hora
      toast.success("Currículo excluído", { description: `${nome} foi removido do sistema.` });
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
    <div className="container mx-auto py-10 px-4 max-w-6xl animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
            Currículos
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Gerencie os candidatos cadastrados no sistema.
          </p>
        </div>
        <Link href="/sistema/paginas/curriculos/novo">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-105 flex items-center gap-2 h-11 px-6">
            <FaPlus /> Novo Currículo
          </Button>
        </Link>
      </div>

      <div className="relative mb-10 max-w-xl">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FaSearch className="text-blue-500" />
        </div>
        <Input
          type="text"
          placeholder="Buscar por nome ou cargo..."
          className="pl-11 h-12 bg-card/50 backdrop-blur-sm border-border focus:border-blue-500/50 focus:ring-blue-500/20 transition-all text-base rounded-xl shadow-sm"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {curriculosFiltrados.length > 0 ? (
          curriculosFiltrados.map((curriculo) => (
            <Card key={curriculo.id} className="flex flex-col h-full bg-card/50 backdrop-blur-sm border-border hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:border-blue-500/50 group">
              <CardHeader>
                <CardTitle className="text-2xl font-bold group-hover:text-blue-500 transition-colors">{curriculo.nome}</CardTitle>
                <CardDescription className="font-medium text-blue-500 text-base">
                  {curriculo.cargoDesejado}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-muted-foreground line-clamp-3 mb-6 leading-relaxed">
                  {curriculo.resumoProfissional}
                </p>
                <div className="mt-auto pt-6 border-t border-border/50 flex gap-3">
                  <Link href={`/sistema/paginas/curriculos/${curriculo.id}`} className="flex-1">
                    <Button variant="outline" className="w-full border-border hover:bg-blue-500/10 hover:text-blue-500 transition-colors">
                      Ver Detalhes
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleExcluir(curriculo.id, curriculo.nome)}
                    className="border-border hover:bg-red-500/10 hover:text-red-500 transition-colors shrink-0"
                  >
                    <FaTrash />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-muted-foreground bg-card/30 rounded-2xl border border-dashed border-border">
            <FaSearch className="text-4xl mb-4 opacity-20" />
            <p className="text-lg">Nenhum currículo encontrado para &quot;<span className="text-foreground font-medium">{busca}</span>&quot;.</p>
          </div>
        )}
      </div>
    </div>
  );
}