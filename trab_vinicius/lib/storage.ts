const CANDIDATOS_MOCKADOS = [
  {
    id: "1", // Atualizado para ID numérico limpo
    nome: "Beatriz Silva",
    cargoDesejado: "Desenvolvedora Front-end Junior",
    email: "beatriz.silva@exemplo.com",
    telefone: "(47) 99123-4567",
    cpf: "123.456.789-00",
    imagemUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    resumoProfissional: "Desenvolvedora focada na criação de interfaces modernas, limpas e altamente responsivas. Amplo interesse em arquitetura de componentes reutilizáveis utilizando React e Next.js.",
    habilidades: "React, Next.js, TypeScript, Tailwind CSS, Git",
    experiencias: [
      {
        empresa: "TechSoluções Digitais",
        cargo: "Estagiária de Front-end",
        descricao: "Atuação no desenvolvimento de layouts responsivos e componentização de telas utilizando Tailwind."
      }
    ],
    formacoes: [
      {
        instituicao: "CEDUP Hermann Hering",
        curso: "Técnico em Desenvolvimento de Sistemas"
      }
    ]
  },
  {
    id: "2", // Atualizado para ID numérico limpo
    nome: "Carlos Eduardo dos Santos",
    cargoDesejado: "Desenvolvedor Back-end Node.js",
    email: "carlos.edu@exemplo.com",
    telefone: "(47) 98876-5432",
    cpf: "987.654.321-11",
    imagemUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    resumoProfissional: "Profissional dedicado à construção de APIs estáveis, seguras e bem documentadas. Experiência em modelagem de bancos de dados relacionais e otimização de consultas.",
    habilidades: "Node.js, Express, PostgreSQL, Docker, TypeScript",
    experiencias: [
      {
        empresa: "Alfa Sistemas Integrados",
        cargo: "Desenvolvedor Backend Junior",
        descricao: "Manutenção de regras de negócio em microsserviços e integração com serviços de mensageria."
      }
    ],
    formacoes: [
      {
        instituicao: "FURB",
        curso: "Sistemas de Informação"
      }
    ]
  },
  {
    id: "3", // Atualizado para ID numérico limpo
    nome: "Mariana Reis",
    cargoDesejado: "Designer de Interface / UI Designer",
    email: "mariana.reis@exemplo.com",
    telefone: "(47) 99234-5678",
    cpf: "456.789.123-22",
    imagemUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    resumoProfissional: "Especialista em transformar fluxos complexos em protótipos de alta fidelidade limpos e minimalistas. Foco total em design systems escaláveis e na jornada de usabilidade do usuário.",
    habilidades: "Figma, Wireframing, Metodologias Ágeis, Design de Componentes",
    experiencias: [
      {
        empresa: "Studio Pixel Factory",
        cargo: "UI Designer Freelancer",
        descricao: "Criação de interfaces visuais para aplicações web corporativas e refinamento de componentes de UI."
      }
    ],
    formacoes: [
      {
        instituicao: "UNISOCIESC",
        curso: "Design Digital"
      }
    ]
  }
];

export const getCurriculos = () => {
  if (typeof window === "undefined") return [];
  
  const dados = localStorage.getItem("curriculos");
  if (!dados) {
    localStorage.setItem("curriculos", JSON.stringify(CANDIDATOS_MOCKADOS));
    return CANDIDATOS_MOCKADOS;
  }
  
  return JSON.parse(dados);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveCurriculo = (novoCandidato: any) => {
  if (typeof window === "undefined") return;
  
  const atuais = getCurriculos();
  const atualizados = [...atuais, novoCandidato];
  localStorage.setItem("curriculos", JSON.stringify(atualizados));
};

export const deleteCurriculo = (id: string) => {
  if (typeof window === "undefined") return;
  
  const atuais = getCurriculos();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filtrados = atuais.filter((c: any) => String(c.id) !== String(id));
  localStorage.setItem("curriculos", JSON.stringify(filtrados));
};