"use client";

import Link from "next/link";
import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { FaArrowLeft, FaPlus, FaTrash, FaSave, FaUpload } from "react-icons/fa";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../../components/ui/card";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { Textarea } from "../../../../../components/ui/textarea";

// Funções de Máscara Manuais (Modernas e sem erros de findDOMNode)
const maskCPF = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

const maskPhone = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1");
};

// 1. Esquema de Validação com YUP
const schema = yup.object({
  nome: yup.string().required("O nome é obrigatório").min(3, "O nome deve ter no mínimo 3 caracteres"),
  cargoDesejado: yup.string().required("O cargo desejado é obrigatório"),
  email: yup.string().email("Digite um formato de e-mail válido").required("O e-mail é obrigatório"),
  telefone: yup.string().required("O telefone é obrigatório").min(14, "Telefone incompleto"),
  cpf: yup.string().required("O CPF é obrigatório").min(14, "CPF incompleto"),
  resumoProfissional: yup.string().required("O resumo é obrigatório").min(20, "O resumo deve ter pelo menos 20 caracteres"),
  habilidades: yup.string().required("Informe pelo menos uma habilidade (separe por vírgula)"),
  experiencias: yup.array().of(
    yup.object({
      empresa: yup.string().required("A empresa é obrigatória"),
      cargo: yup.string().required("O cargo é obrigatório"),
      descricao: yup.string().required("A descrição é obrigatória"),
    })
  ).required(),
  formacoes: yup.array().of(
    yup.object({
      instituicao: yup.string().required("A instituição é obrigatória"),
      curso: yup.string().required("O curso é obrigatório"),
    })
  ).required(),
}).required();

type FormData = yup.InferType<typeof schema>;

export default function NovoCurriculo() {
  const { register, control, handleSubmit, formState: { errors, isValid, isSubmitting }, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      experiencias: [{ empresa: "", cargo: "", descricao: "" }],
      formacoes: [{ instituicao: "", curso: "" }]
    }
  });

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({
    control,
    name: "experiencias",
  });

  const { fields: formFields, append: appendForm, remove: removeForm } = useFieldArray({
    control,
    name: "formacoes",
  });

  const onSubmit = (data: FormData) => {
    console.log("Dados do formulário:", data);
    
    toast.success("Currículo cadastrado com sucesso!", {
      description: `O currículo de ${data.nome} foi salvo na base de dados.`,
    });
    
    reset();
  };

  // Correção: Mostra o erro específico do Yup no toast
  const onError = (formErrors: FieldErrors<FormData>) => {
    let mensagemErroEspecifica = "Preencha os campos corretamente.";

    if (formErrors.nome) mensagemErroEspecifica = formErrors.nome.message as string;
    else if (formErrors.cpf) mensagemErroEspecifica = formErrors.cpf.message as string;
    else if (formErrors.telefone) mensagemErroEspecifica = formErrors.telefone.message as string;
    else if (formErrors.email) mensagemErroEspecifica = formErrors.email.message as string;
    else if (formErrors.cargoDesejado) mensagemErroEspecifica = formErrors.cargoDesejado.message as string;
    else if (formErrors.resumoProfissional) mensagemErroEspecifica = formErrors.resumoProfissional.message as string;
    else if (formErrors.habilidades) mensagemErroEspecifica = formErrors.habilidades.message as string;
    else if (formErrors.experiencias || formErrors.formacoes) mensagemErroEspecifica = "Existem campos de experiência ou formação inválidos/vazios.";

    toast.error("Erro na validação (Yup)", {
      description: mensagemErroEspecifica,
    });
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="mb-6">
        <Link href="/sistema/paginas/curriculos">
          <Button variant="outline" className="flex items-center gap-2">
            <FaArrowLeft /> Voltar
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Cadastrar Currículo</h1>
        <p className="text-muted-foreground mt-1">Preencha os dados abaixo para inserir um novo talento no sistema.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-8">
        
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Dados Pessoais</CardTitle>
            <CardDescription>Informações básicas de contacto do candidato.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Nome Completo</label>
              <Input placeholder="Ex: Vinícius dos Reis" {...register("nome")} className={errors.nome ? "border-red-500" : ""} />
              <span className="text-xs text-red-500">{errors.nome?.message}</span>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">E-mail</label>
              <Input type="email" placeholder="email@exemplo.com" {...register("email")} className={errors.email ? "border-red-500" : ""} />
              <span className="text-xs text-red-500">{errors.email?.message}</span>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Cargo Desejado</label>
              <Input placeholder="Ex: Desenvolvedor Front-end" {...register("cargoDesejado")} className={errors.cargoDesejado ? "border-red-500" : ""} />
              <span className="text-xs text-red-500">{errors.cargoDesejado?.message}</span>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Telefone</label>
              <Input 
                placeholder="(00) 00000-0000" 
                {...register("telefone")} 
                onChange={(e) => {
                  e.target.value = maskPhone(e.target.value);
                  register("telefone").onChange(e);
                }}
                className={errors.telefone ? "border-red-500" : ""} 
              />
              <span className="text-xs text-red-500">{errors.telefone?.message}</span>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">CPF</label>
              <Input 
                placeholder="000.000.000-00" 
                {...register("cpf")} 
                onChange={(e) => {
                  e.target.value = maskCPF(e.target.value);
                  register("cpf").onChange(e);
                }}
                className={errors.cpf ? "border-red-500" : ""} 
              />
              <span className="text-xs text-red-500">{errors.cpf?.message}</span>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Foto de Perfil (Opcional)</label>
              <div className="flex items-center gap-4">
                <Button type="button" variant="outline" className="gap-2">
                  <FaUpload /> Escolher Imagem
                </Button>
                <span className="text-xs text-muted-foreground">Nenhum ficheiro selecionado</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Perfil Profissional</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Resumo Profissional</label>
              <Textarea placeholder="Descreva brevemente o perfil, experiências e objetivos..." className={`min-h-[100px] ${errors.resumoProfissional ? "border-red-500" : ""}`} {...register("resumoProfissional")} />
              <span className="text-xs text-red-500">{errors.resumoProfissional?.message}</span>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Habilidades Técnicas</label>
              <Input placeholder="Ex: React, Next.js, Tailwind, Montagem de PC" {...register("habilidades")} className={errors.habilidades ? "border-red-500" : ""} />
              <span className="text-xs text-red-500">{errors.habilidades?.message}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Experiência Profissional</CardTitle>
              <CardDescription>Adicione as experiências anteriores do candidato.</CardDescription>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => appendExp({ empresa: "", cargo: "", descricao: "" })} className="gap-2 text-blue-500 border-blue-500 hover:bg-blue-500/10">
              <FaPlus /> Adicionar
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {expFields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg relative bg-background/50">
                <div className="space-y-2">
                  <label className="text-xs font-medium">Empresa</label>
                  <Input {...register(`experiencias.${index}.empresa`)} className={errors.experiencias?.[index]?.empresa ? "border-red-500" : ""} />
                  <span className="text-xs text-red-500">{errors.experiencias?.[index]?.empresa?.message}</span>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium">Cargo</label>
                  <Input {...register(`experiencias.${index}.cargo`)} className={errors.experiencias?.[index]?.cargo ? "border-red-500" : ""} />
                  <span className="text-xs text-red-500">{errors.experiencias?.[index]?.cargo?.message}</span>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-medium">Descrição das Atividades</label>
                  <Textarea {...register(`experiencias.${index}.descricao`)} className={errors.experiencias?.[index]?.descricao ? "border-red-500" : ""} />
                  <span className="text-xs text-red-500">{errors.experiencias?.[index]?.descricao?.message}</span>
                </div>
                {index > 0 && (
                  <Button type="button" variant="destructive" size="icon" className="absolute -top-3 -right-3 h-8 w-8 rounded-full" onClick={() => removeExp(index)}>
                    <FaTrash className="text-xs" />
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Formação Acadêmica</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={() => appendForm({ instituicao: "", curso: "" })} className="gap-2 text-green-500 border-green-500 hover:bg-green-500/10">
              <FaPlus /> Adicionar
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {formFields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg relative bg-background/50">
                <div className="space-y-2">
                  <label className="text-xs font-medium">Instituição</label>
                  <Input {...register(`formacoes.${index}.instituicao`)} className={errors.formacoes?.[index]?.instituicao ? "border-red-500" : ""} />
                  <span className="text-xs text-red-500">{errors.formacoes?.[index]?.instituicao?.message}</span>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium">Curso</label>
                  <Input {...register(`formacoes.${index}.curso`)} className={errors.formacoes?.[index]?.curso ? "border-red-500" : ""} />
                  <span className="text-xs text-red-500">{errors.formacoes?.[index]?.curso?.message}</span>
                </div>
                {index > 0 && (
                  <Button type="button" variant="destructive" size="icon" className="absolute -top-3 -right-3 h-8 w-8 rounded-full" onClick={() => removeForm(index)}>
                    <FaTrash className="text-xs" />
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end pt-4 pb-10">
          <Button 
            type="submit" 
            size="lg" 
            disabled={!isValid || isSubmitting} 
            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white disabled:bg-slate-600 disabled:cursor-not-allowed w-full md:w-auto"
          >
            <FaSave /> {isSubmitting ? "Salvando..." : "Salvar Currículo"}
          </Button>
        </div>
      </form>
    </div>
  );
}