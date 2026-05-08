"use client";

import { useState } from "react";
import Link from "next/link";
import { mockCurriculos } from "../../../../lib/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { FaSearch, FaPlus } from "react-icons/fa";

export default function ListaCurriculos() {
  const [busca, setBusca] = useState("");

  // Requisito 7.2: Filtro em tempo real por Nome ou Cargo
  const curriculosFiltrados = mockCurriculos.filter((curriculo) => {
    const termo = busca.toLowerCase();
    return (
      curriculo.nome.toLowerCase().includes(termo) ||
      curriculo.cargoDesejado.toLowerCase().includes(termo)
    );
  });

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Currículos</h1>
          <p className="text-slate-500 mt-1">Gerencie os candidatos cadastrados no sistema.</p>
        </div>
        <Link href="/sistema/paginas/curriculos/novo">
          <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
            <FaPlus /> Novo Currículo
          </Button>
        </Link>
      </div>

      <div className="relative mb-8 max-w-md">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Buscar por nome ou cargo..."
          className="pl-10"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {curriculosFiltrados.length > 0 ? (
          curriculosFiltrados.map((curriculo) => (
            <Card key={curriculo.id} className="flex flex-col h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{curriculo.nome}</CardTitle>
                <CardDescription className="font-medium text-blue-600">
                  {curriculo.cargoDesejado}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                  {curriculo.resumoProfissional}
                </p>
                <div className="mt-auto pt-4 border-t">
                  <Link href={`/sistema/paginas/curriculos/${curriculo.id}`}>
                    <Button variant="outline" className="w-full">
                      Ver Detalhes
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            Nenhum currículo encontrado para &quot;{busca}&quot;.
          </div>
        )}
      </div>
    </div>
  );
}