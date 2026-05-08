import { mockCurriculos } from "./mockData";

// Busca os currículos salvos ou retorna os mocks se o banco estiver vazio
export const getCurriculos = () => {
  // Evita erros no servidor do Next.js
  if (typeof window === "undefined") return []; 
  
  const salvos = localStorage.getItem("curriculos_db");
  if (salvos) {
    return JSON.parse(salvos);
  }
  
  // Se for a primeira vez rodando, salva os mocks como base
  localStorage.setItem("curriculos_db", JSON.stringify(mockCurriculos));
  return mockCurriculos;
};

// Adiciona um novo currículo no topo da lista
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveCurriculo = (novoCurriculo: any) => {
  const atuais = getCurriculos();
  const atualizados = [novoCurriculo, ...atuais];
  localStorage.setItem("curriculos_db", JSON.stringify(atualizados));
};

// Exclui um currículo pelo ID
export const deleteCurriculo = (id: string) => {
  const atuais = getCurriculos();
  // Filtra a lista, mantendo todos MENOS o que tem o ID clicado
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const novaLista = atuais.filter((c: any) => String(c.id) !== String(id));
  localStorage.setItem("curriculos_db", JSON.stringify(novaLista));
};