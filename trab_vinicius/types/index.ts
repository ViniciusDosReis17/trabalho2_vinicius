export interface Experiencia {
  id?: string; // Útil para o React Hook Form mais tarde
  empresa: string;
  cargo: string;
  descricao: string;
}

export interface Formacao {
  id?: string;
  instituicao: string;
  curso: string;
}

export interface Curriculo {
  id: string;
  nome: string;
  cargoDesejado: string;
  email: string;
  telefone: string;
  cpf: string;
  resumoProfissional: string;
  experiencias: Experiencia[];
  formacoes: Formacao[];
  habilidades: string;
  imagemUrl?: string; // Para o upload fake de imagem exigido
}