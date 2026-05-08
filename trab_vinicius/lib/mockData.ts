import { Curriculo } from "../types";

export const mockCurriculos: Curriculo[] = [
  {
    id: "1",
    nome: "Lucas Mendes",
    cargoDesejado: "Técnico em Hardware",
    email: "lucas.mendes@email.com",
    telefone: "(47) 99999-8888",
    cpf: "123.456.789-00",
    resumoProfissional: "Especialista na montagem e manutenção de sistemas de alta performance. Vasta experiência na arquitetura AM5, otimização de refrigeração líquida e configuração de setups complexos para simuladores de corrida imersivos.",
    experiencias: [
      {
        empresa: "Tech Simulators",
        cargo: "Especialista de Setup",
        descricao: "Responsável pela montagem de cockpits e calibração de force feedback em volantes direct drive para ligas de automobilismo virtual."
      }
    ],
    formacoes: [
      {
        instituicao: "Instituto de Tecnologia",
        curso: "Sistemas e Hardware"
      }
    ],
    habilidades: "Montagem de PC, AM5, Cable Management, Troubleshooting",
    imagemUrl: "/default-avatar.png" // Lembrando que as imagens precisam ficar na pasta public
  }
];