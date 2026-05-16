"use client";

import Link from "next/link";
import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { FaArrowLeft, FaPlus, FaTrash, FaSave, FaImage, FaUserTie, FaCode, FaBriefcase, FaGraduationCap, FaExclamationCircle } from "react-icons/fa";
import { saveCurriculo } from "../../../../../lib/storage";

import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { Textarea } from "../../../../../components/ui/textarea";

interface IFormInput {
  nome: string;
  cargoDesejado: string;
  email: string;
  telefone: string;
  cpf: string;
  imagemUrl: string;
  resumoProfissional: string;
  habilidades: string;
  experiencias: { empresa: string; cargo: string; descricao: string; }[];
  formacoes: { instituicao: string; curso: string; }[];
}

const maskCPF = (value: string) => value.replace(/\D/g, "").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})/, "$1-$2").replace(/(-\d{2})\d+?$/, "$1");
const maskPhone = (value: string) => value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2").replace(/(-\d{4})\d+?$/, "$1");

const schema: yup.ObjectSchema<IFormInput> = yup.object({
  nome: yup.string().required("O nome é obrigatório").min(3, "Mínimo 3 caracteres"),
  cargoDesejado: yup.string().required("O cargo é obrigatório"),
  email: yup.string().email("E-mail inválido").required("O e-mail é obrigatório"),
  telefone: yup.string().required("O telefone é obrigatório").min(14, "Telefone incompleto"),
  cpf: yup.string().required("O CPF é obrigatório").min(14, "CPF incompleto"),
  imagemUrl: yup.string().default(""), 
  resumoProfissional: yup.string().required("O resumo é obrigatório").min(20, "Mínimo 20 caracteres"),
  habilidades: yup.string().required("Informe as habilidades"),
  experiencias: yup.array().of(
    yup.object({
      empresa: yup.string().required("Obrigatório"),
      cargo: yup.string().required("Obrigatório"),
      descricao: yup.string().required("Obrigatório"),
    }).required()
  ).required(),
  formacoes: yup.array().of(
    yup.object({
      instituicao: yup.string().required("Obrigatório"),
      curso: yup.string().required("Obrigatório"),
    }).required()
  ).required(),
}).required();

export default function NovoCurriculo() {
  const { register, control, handleSubmit, formState: { errors, isValid, isSubmitting }, reset } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      nome: "", cargoDesejado: "", email: "", telefone: "", cpf: "", imagemUrl: "", resumoProfissional: "", habilidades: "",
      experiencias: [{ empresa: "", cargo: "", descricao: "" }],
      formacoes: [{ instituicao: "", curso: "" }]
    }
  });

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control, name: "experiencias" });
  const { fields: formFields, append: appendForm, remove: removeForm } = useFieldArray({ control, name: "formacoes" });

  const onSubmit = (data: IFormInput) => {
    const novoCandidato = { id: Math.random().toString(36).substring(2, 9), ...data };
    saveCurriculo(novoCandidato);
    toast.success("Candidato Registrado", { 
      style: { background: '#0a0a0a', color: '#22c55e', border: '1px solid #22c55e' }
    });
    reset();
  };

  const onError = (formErrors: FieldErrors<IFormInput>) => {
    const errorMessages = Object.values(formErrors);
    if (errorMessages.length > 0) {
      toast.error("Erro de Validação", { description: String(errorMessages[0]?.message || "Verifique os dados") });
    }
  };

  const inputClass = "h-12 bg-background/50 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all rounded-xl";

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl relative animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Glow de fundo inspirado no Coringa */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-primary/10 blur-[100px] -z-10 rounded-full pointer-events-none"></div>

      <div className="mb-8">
        <Link href="/sistema/paginas/curriculos">
          <Button variant="outline" className="gap-2 bg-card/50 backdrop-blur-sm border-border hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all rounded-xl">
            <FaArrowLeft /> Voltar
          </Button>
        </Link>
      </div>

      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-2">
          Novo <span className="text-primary">Currículo</span>
        </h1>
        <p className="text-muted-foreground text-lg font-medium">Cadastre um novo talento no sistema.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-10 pb-20">
        
        {/* SEÇÃO: DADOS PESSOAIS */}
        <Card className="bg-card/40 backdrop-blur-md border-border shadow-lg hover:border-primary/30 transition-all duration-500 rounded-2xl group overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-600 opacity-60 group-hover:opacity-100 transition-opacity"></div>
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-3">
               <div className="p-2 bg-primary/10 rounded-lg text-primary"><FaUserTie /></div>
               Dados Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Nome Completo</label>
              <Input placeholder="Ex: Lucas Mendes" {...register("nome")} className={`${inputClass} ${errors.nome ? "border-red-500/50 focus:ring-red-500/20" : ""}`} />
              {errors.nome && <p className="text-xs text-red-400 flex items-center gap-1"><FaExclamationCircle /> {errors.nome.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">E-mail</label>
              <Input type="email" placeholder="lucas@exemplo.com" {...register("email")} className={inputClass} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Cargo Desejado</label>
              <Input placeholder="Ex: Desenvolvedor Full Stack" {...register("cargoDesejado")} className={inputClass} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Telefone</label>
              <Input placeholder="(00) 00000-0000" {...register("telefone")} onChange={(e) => { e.target.value = maskPhone(e.target.value); register("telefone").onChange(e); }} className={inputClass} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">CPF</label>
              <Input placeholder="000.000.000-00" {...register("cpf")} onChange={(e) => { e.target.value = maskCPF(e.target.value); register("cpf").onChange(e); }} className={inputClass} />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <FaImage className="text-primary" /> URL da Foto (Opcional)
              </label>
              <Input placeholder="https://github.com/usuario.png" {...register("imagemUrl")} className={inputClass} />
            </div>
          </CardContent>
        </Card>

        {/* SEÇÃO: PERFIL E HABILIDADES */}
        <Card className="bg-card/40 backdrop-blur-md border-border shadow-lg hover:border-primary/30 transition-all duration-500 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary"><FaCode /></div>
              Perfil Profissional
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Resumo Profissional</label>
              <Textarea placeholder="Descreva sua trajetória..." className="min-h-[120px] bg-background/50 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all hover:border-primary/30 rounded-xl" {...register("resumoProfissional")} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Habilidades Técnicas</label>
              <Input placeholder="React, TypeScript, Tailwind..." {...register("habilidades")} className={inputClass} />
            </div>
          </CardContent>
        </Card>

        {/* SEÇÃO: EXPERIÊNCIA PROFISSIONAL */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
              <FaBriefcase className="text-primary" /> Experiência Profissional
            </h2>
            <Button type="button" onClick={() => appendExp({ empresa: "", cargo: "", descricao: "" })} className="gap-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-black transition-all rounded-xl font-bold">
              <FaPlus /> Adicionar
            </Button>
          </div>
          {expFields.map((field, index) => (
            <Card key={field.id} className="bg-card/30 backdrop-blur-sm border-border relative group overflow-hidden rounded-2xl hover:border-primary/40 transition-all">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-primary/60 group-hover:bg-primary transition-colors"></div>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 pl-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Empresa</label>
                  <Input {...register(`experiencias.${index}.empresa`)} className={inputClass} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Cargo</label>
                  <Input {...register(`experiencias.${index}.cargo`)} className={inputClass} />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Descrição</label>
                  <Textarea {...register(`experiencias.${index}.descricao`)} className="bg-background/40 border-border focus:border-primary transition-all rounded-xl min-h-[80px]" />
                </div>
                {index > 0 && (
                  <Button type="button" variant="destructive" size="icon" className="absolute top-4 right-4 h-9 w-9 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg" onClick={() => removeExp(index)}>
                    <FaTrash className="text-sm" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* SEÇÃO: FORMAÇÃO ACADÊMICA */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
              <FaGraduationCap className="text-purple-500" /> Formação Acadêmica
            </h2>
            <Button type="button" onClick={() => appendForm({ instituicao: "", curso: "" })} className="gap-2 bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-600 hover:text-white transition-all rounded-xl font-bold">
              <FaPlus /> Adicionar
            </Button>
          </div>
          {formFields.map((field, index) => (
            <Card key={field.id} className="bg-card/30 backdrop-blur-sm border-border relative group overflow-hidden rounded-2xl hover:border-purple-500/40 transition-all">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-500/60 group-hover:bg-purple-500 transition-colors"></div>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 pl-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Instituição</label>
                  <Input {...register(`formacoes.${index}.instituicao`)} className={inputClass} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Curso</label>
                  <Input {...register(`formacoes.${index}.curso`)} className={inputClass} />
                </div>
                {index > 0 && (
                  <Button type="button" variant="destructive" size="icon" className="absolute top-4 right-4 h-9 w-9 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg bg-red-500 hover:bg-red-600" onClick={() => removeForm(index)}>
                    <FaTrash className="text-sm" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* BOTÃO SALVAR - Estilo Premium LOUD */}
        <div className="flex justify-end pt-8 border-t border-border/50">
          <Button 
            type="submit" 
            disabled={!isValid || isSubmitting} 
            className="w-full md:w-auto h-14 px-12 text-lg font-bold bg-primary hover:bg-primary/80 text-black shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-300 hover:scale-[1.02] rounded-xl"
          >
            {isSubmitting ? "Gravando..." : "Salvar Currículo"}
            <FaSave className="ml-3" />
          </Button>
        </div>
      </form>
    </div>
  );
}