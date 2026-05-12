# DevGestão - Sistema de Gestão de Currículos

Este projeto é uma aplicação web desenvolvida para o **Trabalho 2** da disciplina, focada na experiência do usuário (UX) e em uma arquitetura modular utilizando o ecossistema **Next.js**. O sistema permite o cadastro, visualização e gerenciamento de currículos com uma interface inspirada na identidade visual de alta performance das lives do streamer Coringa (LOUD).

---

##  Stack Tecnológica

Para atender aos requisitos técnicos e desafios propostos, foram utilizadas as seguintes ferramentas:

* **Framework:** Next.js (App Router) para rotas dinâmicas e gerenciamento de páginas.
* **Estilização:** Tailwind CSS para design responsivo e customização de temas.
* **UI Library:** shadcn/ui para a construção de componentes de interface consistentes.
* **Formulários:** React Hook Form e Yup para o gerenciamento e validação de esquemas.
* **Notificações:** Sonner para feedbacks visuais via toasts em todas as ações do sistema.
* **Ícones:** React Icons para uma navegação intuitiva e identificação de funcionalidades.

---

##  Estrutura de Rotas e Páginas

A aplicação segue a organização modular de pastas exigida:

1.  **Home (`/`):** Landing page apresentando os benefícios e funcionalidades do sistema.
2.  **Lista de Currículos (`/sistema/paginas/curriculos`):** Exibição de cards com resumos e filtro de busca em tempo real.
3.  **Detalhes do Currículo (`/sistema/paginas/curriculos/[id]`):** Rota dinâmica que exibe todas as informações do candidato e permite a geração de documentos (PDF).
4.  **Cadastro (`/sistema/paginas/curriculos/novo`):** Formulário completo para inserção de novos dados com validação rigorosa.

---

##  Desafios Técnicos Implementados

Para atingir a nota máxima na etapa 1, o projeto implementou obrigatoriamente os seguintes desafios:

### 1. Gerenciamento de Formulário Dinâmico (Field Arrays)
O formulário de cadastro não é estático. Foi implementada a funcionalidade de campos dinâmicos utilizando o `useFieldArray` do **React Hook Form**. O usuário é capaz de adicionar ou remover múltiplos campos de **Experiência Profissional** e **Formação Acadêmica** dinamicamente no mesmo formulário.

### 2. Validação e Máscaras de Entrada
* **Validação por Esquema:** Cada item adicionado dinamicamente é validado pelo esquema do **Yup**.
* **Máscaras:** Foram aplicadas máscaras de entrada em campos críticos como **CPF** e **Telefone** para garantir a integridade dos dados.
* **Feedback de Erro:** O toast do **Sonner** exibe a descrição específica do erro retornado pela validação do Yup.

### 3. Filtro e Busca em Tempo Real
A lista de talentos é filtrada automaticamente por **Nome** ou **Cargo** à medida que o usuário digita na barra de busca, otimizando a consulta aos dados.

---

##  Design e Usabilidade

O projeto respeita os critérios de refinamento de interface exigidos:

* **Identidade Visual:** Aplicação de paleta de cores contrastantes (Verde Neon e Roxo Escuro) que respeitam os níveis de legibilidade e estética moderna.
* **Estados de Elementos:** Botões possuem estados de `hover`, `focus-visible` e `disabled` quando o formulário é inválido ou está sendo enviado.
* **Navegação:** O menu Nav implementa um link ativo (**active state**) visual para indicar a localização atual do usuário no sistema.
* **Persistência:** Os dados são armazenados localmente via `localStorage` para garantir o funcionamento da aplicação mockada.

---

## 🏁 Como Executar

1.  Instale as dependências:
    ```bash
    npm install
    ```
2.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
3.  Acesse:
    `http://localhost:3000`

---
