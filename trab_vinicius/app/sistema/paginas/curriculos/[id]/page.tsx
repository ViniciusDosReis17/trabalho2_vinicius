import Link from "next/link";
import { FaArrowLeft, FaEnvelope, FaPhone, FaIdCard } from "react-icons/fa";
import { mockCurriculos } from "../../../../../lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card";
import { Button } from "../../../../../components/ui/button";

// Transformamos em uma função async para poder esperar os parâmetros da URL
export default async function DetalhesCurriculo({ params }: { params: Promise<{ id: string }> }) {
  // Aguardamos o ID chegar da URL
  const { id } = await params;
  
  // Agora buscamos o currículo com o ID garantido
  const curriculo = mockCurriculos.find((c) => c.id === id);

  if (!curriculo) {
    return (
      <div className="container mx-auto py-20 text-center bg-background text-foreground">
        <h1 className="text-2xl font-bold mb-4">Currículo não encontrado</h1>
        <Link href="/sistema/paginas/curriculos">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Voltar para a lista</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl bg-background text-foreground">
      <div className="mb-6">
        <Link href="/sistema/paginas/curriculos">
          <Button variant="outline" className="flex items-center gap-2 mb-6 border-border text-foreground hover:bg-accent">
            <FaArrowLeft /> Voltar
          </Button>
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{curriculo.nome}</h1>
            <p className="text-xl text-blue-500 font-medium mt-1">{curriculo.cargoDesejado}</p>
          </div>
          <div className="w-24 h-24 bg-muted rounded-full border-2 border-border flex items-center justify-center overflow-hidden">
             {curriculo.imagemUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={curriculo.imagemUrl} alt={curriculo.nome} className="w-full h-full object-cover" />
             ) : (
                <span className="text-xs text-muted-foreground text-center px-2">Sem foto</span>
             )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg border-b border-border pb-2">Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-500" />
                <span className="text-sm">{curriculo.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-blue-500" />
                <span className="text-sm">{curriculo.telefone}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaIdCard className="text-blue-500" />
                <span className="text-sm">{curriculo.cpf}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg border-b border-border pb-2">Habilidades</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex flex-wrap gap-2">
                {curriculo.habilidades.split(",").map((habilidade, index) => (
                  <span key={index} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    {habilidade.trim()}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg border-b border-border pb-2">Resumo Profissional</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {curriculo.resumoProfissional}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg border-b border-border pb-2 text-foreground">Experiência Profissional</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              {curriculo.experiencias.map((exp, index) => (
                <div key={index} className="relative pl-4 border-l-2 border-blue-500">
                  <h3 className="font-semibold text-foreground">{exp.cargo}</h3>
                  <h4 className="text-sm text-blue-500 font-medium">{exp.empresa}</h4>
                  <p className="text-sm text-muted-foreground mt-2">{exp.descricao}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg border-b border-border pb-2 text-foreground">Formação Acadêmica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              {curriculo.formacoes.map((form, index) => (
                <div key={index} className="relative pl-4 border-l-2 border-green-500">
                  <h3 className="font-semibold text-foreground">{form.curso}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{form.instituicao}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}