import Grid from '@mui/material/Unstable_Grid2';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useState } from 'react'
import { Box } from '@mui/material';
import { Form } from '../../shared/components/form';
import { useAuthContextCliente } from '../../shared/contexts';
import { useNavigate } from 'react-router-dom';

const createUserSchema = z.object({
  nm_pessoa: z.string().nonempty({
    message: 'O nome é obrigatório',
  }).transform(nm_pessoa => {
    return nm_pessoa
    .trim()
    .split(' ')
    .map(word => word[0].toLocaleUpperCase().concat(word.substring(1)))
    .join(' ')
  }),
  cgc_pessoa: z.string().min(11).max(11).nonempty({ message: 'CPF  é Obrigatório' }),
  rg_pessoa: z.string().nonempty({ message: 'Rg é Obrigatório' }),
  cd_expedidor_pessoa: z.string().nonempty({ message: 'Orgão Expedidor é Obrigatório' }),
  ds_naturalidade_pessoa: z.string().nonempty({ message: 'Nacionalidade é Obrigatório' }),
  dt_nascimento_pessoa: z.date(),
  cd_estado_civil_pessoa: z.string().nonempty({ message: 'Estado Civil  é Obrigatório' }),
  cd_profissao_pessoa: z.string().nonempty({ message: 'Profissão  é Obrigatório' }),
  end_pessoa: z.string().nonempty({ message: 'Endereço é Obrigatório' }),
  cd_bairro_pessoa: z.number(),
  nu_endereco_pessoa: z.string().max(5).nonempty({ message: 'N° é Obrigatório' }),
  cep_pessoa: z.string().max(8).nonempty({ message: 'Cep  é Obrigatório' }),
  end_complemento_pessoa: z.string(),
  cd_cidade_pessoa: z.string().nonempty({ message: 'Cidade é Obrigatório' }),
  cd_tipo_logradouro_pessoa: z.string().nonempty({ message: 'Logradouro é Obrigatório' }),
  nu_fone_pessoa: z.string().min(10).max(11).nonempty({ message: 'Telefone  é Obrigatório' }),
  nu_celular_pessoa: z.string().min(10).max(11).nonempty({ message: 'Celular  é Obrigatório' }),
  e_mail_pessoa: z.string().nonempty({
    message: 'O e-mail é obrigatório',
  }).email({
    message: 'Formato de e-mail inválido',
  }).toLowerCase(),
  cd_escolaridade: z.number(),
  vlr_salario: z.number(),
  nu_fone_zap: z.number(),
 
  end_cobranca: z.string().nonempty({ message: 'Endereço é Obrigatório' }),
  nu_endereco_cobranca: z.string().nonempty({ message: 'N° é Obrigatório' }),
  end_complemento_cobranca: z.string(),
  cd_bairro_cobranca: z.string().nonempty({ message: 'Bairro é Obrigatório' }),
  cd_tipo_logradouro_cobranca: z.string().nonempty({ message: 'Logradouro é Obrigatório' }),
  cep_cobranca: z.string().min(7).max(7).nonempty({ message: 'Cep  é Obrigatório' }),
  uf_cobranca: z.string().min(7).max(7).nonempty({ message: 'UF  é Obrigatório' }),
  cd_cidade_cobranca: z.string().nonempty({ message: 'Cidade é Obrigatório' }),
  
  
  ds_filicao_pai: z.string().nonempty({ message: 'Filiação é Obrigatório' }),
  ds_filicao_mae: z.string().nonempty({ message: 'Filiação é Obrigatório' }),
 
  ds_local_trabalho: z.string().nonempty({ message: 'Local de Trabalho é Obrigatório' }),
  ds_admissao: z.string().nonempty({ message: 'Admissão é Obrigatório' }),

  end_trabalho: z.string().nonempty({ message: 'Endereço é Obrigatório' }),
  nu_endereco_trabalho: z.string().max(5).nonempty({ message: 'N° é Obrigatório' }),
  cd_bairro_trabalho: z.string().nonempty({ message: 'Bairro é Obrigatório' }),
  cd_cidade_trabalho: z.string().nonempty({ message: 'Cidade é Obrigatório' }),
  cep_trabalho: z.string().min(7).max(7).nonempty({ message: 'Cep  é Obrigatório' }),
  nu_fone_trabalho: z.string().min(10).max(11).nonempty({ message: 'Telefone  é Obrigatório' }),

  //spouse

  nm_conjuge: z.string().nonempty({
    message: 'O nome é obrigatório',
  }).transform(nm_conjuge => {
    return nm_conjuge
      .trim()
      .split(' ')
      .map(word => word[0].toLocaleUpperCase().concat(word.substring(1)))
      .join(' ')
  }),
  cd_profissao_conjuge: z.string().nonempty({ message: 'Profissão  é Obrigatório' }),
  cd_expedidor_conjuge: z.string().nonempty({ message: 'Orgão Expedidor é Obrigatório' }),
  cic_conjuge: z.string().min(11).max(11).nonempty({ message: 'CPF  é Obrigatório' }),
  rg_conjuge: z.string().nonempty({ message: 'Rg é Obrigatório' }),
  dt_nascimento_conjuge: z.string().nonempty({ message: 'Date de Nascimento é obrigatório' }),
  ds_naturalidade_conjuge: z.string().nonempty({ message: 'Nacionalidade é Obrigatório' }),
  nu_fone_conjuge: z.string().min(10).max(11).nonempty({ message: 'Telefone  é Obrigatório' }),
  
  vlr_salario_conjuge: z.string().nonempty({ message: 'Renda Mensal  é Obrigatório' }),
  
  ds_filicao_pai_conjuge: z.string().nonempty({ message: 'Filiação é Obrigatório' }),
  ds_filicao_mae_conjuge: z.string().nonempty({ message: 'Filiação é Obrigatório' }),
 
  ds_local_trabalho_conjugue: z.string().nonempty({ message: 'Local de Trabalho é Obrigatório' }),
  ds_admissao_conjugue: z.date(),

  end_trabalho_conjugue: z.string().nonempty({ message: 'Endereço é Obrigatório' }),
  nu_endereco_trabalho_conjugue: z.string().max(5).nonempty({ message: 'Endereço é Obrigatório' }),
  cd_bairro_trabalho_conjugue: z.string().nonempty({ message: 'Bairro é Obrigatório' }),
  cd_cidade_trabalho_conjugue: z.string().nonempty({ message: 'Cidade é Obrigatório' }),
  cep_trabalho_conjugue: z.string().min(7).max(7).nonempty({ message: 'Cep  é Obrigatório' }),
  nu_fone_trabalho_conjugue: z.string().min(10).max(11).nonempty({ message: 'Telefone  é Obrigatório' }),

  e_mail_conjugue: z.string().nonempty({
    message: 'O e-mail é obrigatório',
  }).email({
    message: 'Formato de e-mail inválido',
  }).toLowerCase(),


  //last years residence

  optionsResidence: z.enum(["Alugada", "Própria", "Outros"]),
  obs_pessoa: z.string(),

  //personal information

  nm_contato: z.string().nonempty({
    message: 'O nome é obrigatório',
  }).transform(nm_contato => {
    return nm_contato
      .trim()
      .split(' ')
      .map(word => word[0].toLocaleUpperCase().concat(word.substring(1)))
      .join(' ')
  }),
  nu_fone_contato: z.string().min(10).max(11).nonempty({ message: 'Telefone  é Obrigatório' }),
  end_contato: z.string().nonempty({ message: 'Endereço é Obrigatório' }),
  
  nm_contato_sg: z.string().nonempty({
    message: 'O nome é obrigatório',
  }).transform(nm_contato_sg => {
    return nm_contato_sg
      .trim()
      .split(' ')
      .map(word => word[0].toLocaleUpperCase().concat(word.substring(1)))
      .join(' ')
  }),
  nu_fone_contato_sg: z.string().min(10).max(11).nonempty({ message: 'Telefone  é Obrigatório' }),
  end_contato_sg: z.string().nonempty({ message: 'Endereço é Obrigatório' }),

  ds_pessoas_qi_morar: z.string().nonempty({ message: 'Campo é Obrigatório' }),
  nm_pessoas: z.number().nonnegative(),
  nm_adultos: z.number().nonnegative(),
  nm_criancas: z.number().nonnegative(),
  num_animais: z.number().nonnegative(),

  //Guarantor

  nm_pessoa_fiador: z.string().nonempty({
    message: 'O nome é obrigatório',
  }).transform(nm_pessoa_fiador => {
    return nm_pessoa_fiador
    .trim()
    .split(' ')
    .map(word => word[0].toLocaleUpperCase().concat(word.substring(1)))
    .join(' ')
  }),
  cgc_pessoa_fiador: z.string().min(11).max(11).nonempty({ message: 'CPF  é Obrigatório' }),
  rg_pessoa_fiador: z.string().nonempty({ message: 'Rg é Obrigatório' }),
  cd_expedidor_pessoa_fiador: z.string().nonempty({ message: 'Orgão Expedidor é Obrigatório' }),
  ds_naturalidade_pessoa_fiador: z.string().nonempty({ message: 'Nacionalidade é Obrigatório' }),
  dt_nascimento_pessoa_fiador: z.date(),
  cd_estado_civil_pessoa_fiador: z.string().nonempty({ message: 'Estado Civil  é Obrigatório' }),
  cd_profissao_pessoa_fiador: z.string().nonempty({ message: 'Profissão  é Obrigatório' }),
  end_pessoa_fiador: z.string().nonempty({ message: 'Endereço é Obrigatório' }),
  cd_bairro_pessoa_fiador: z.number(),
  nu_endereco_pessoa_fiador: z.string().max(5).nonempty({ message: 'N° é Obrigatório' }),
  cep_pessoa_fiador: z.string().max(8).nonempty({ message: 'Cep  é Obrigatório' }),
  end_complemento_pessoa_fiador: z.string(),
  cd_cidade_pessoa_fiador: z.string().nonempty({ message: 'Cidade é Obrigatório' }),
  cd_tipo_logradouro_pessoa_fiador: z.string().nonempty({ message: 'Logradouro é Obrigatório' }),
  nu_fone_pessoa_fiador: z.string().min(10).max(11).nonempty({ message: 'Telefone  é Obrigatório' }),
  nu_celular_pessoa_fiador: z.string().min(10).max(11).nonempty({ message: 'Celular  é Obrigatório' }),
  e_mail_pessoa_fiador: z.string().nonempty({
    message: 'O e-mail é obrigatório',
  }).email({
    message: 'Formato de e-mail inválido',
  }).toLowerCase(),
  cd_escolaridade_fiador: z.number(),
  vlr_salario_fiador: z.number(),
  nu_fone_zap_fiador: z.number(),
  
  
  ds_filicao_pai_fiador: z.string().nonempty({ message: 'Filiação é Obrigatório' }),
  ds_filicao_mae_fiador: z.string().nonempty({ message: 'Filiação é Obrigatório' }),
 
  ds_local_trabalho_fiador: z.string().nonempty({ message: 'Local de Trabalho é Obrigatório' }),
  ds_admissao_fiador: z.string().nonempty({ message: 'Admissão é Obrigatório' }),

  end_trabalho_fiador: z.string().nonempty({ message: 'Endereço é Obrigatório' }),
  nu_endereco_trabalho_fiador: z.string().max(5).nonempty({ message: 'N° é Obrigatório' }),
  cd_bairro_trabalho_fiador: z.string().nonempty({ message: 'Bairro é Obrigatório' }),
  cd_cidade_trabalho_fiador: z.string().nonempty({ message: 'Cidade é Obrigatório' }),
  cep_trabalho_fiador: z.string().min(7).max(7).nonempty({ message: 'Cep  é Obrigatório' }),
  nu_fone_trabalho_fiador: z.string().min(10).max(11).nonempty({ message: 'Telefone  é Obrigatório' }),

  //spouse

  nm_conjuge_fiador: z.string().nonempty({
    message: 'O nome é obrigatório',
  }).transform(nm_conjuge_fiador => {
    return nm_conjuge_fiador
      .trim()
      .split(' ')
      .map(word => word[0].toLocaleUpperCase().concat(word.substring(1)))
      .join(' ')
  }),
  cd_profissao_conjuge_fiador: z.string().nonempty({ message: 'Profissão  é Obrigatório' }),
  cd_expedidor_conjuge_fiador: z.string().nonempty({ message: 'Orgão Expedidor é Obrigatório' }),
  cic_conjuge_fiador: z.string().min(11).max(11).nonempty({ message: 'CPF  é Obrigatório' }),
  rg_conjuge_fiador: z.string().nonempty({ message: 'Rg é Obrigatório' }),
  dt_nascimento_conjuge_fiador: z.string().nonempty({ message: 'Date de Nascimento é obrigatório' }),
  ds_naturalidade_conjuge_fiador: z.string().nonempty({ message: 'Nacionalidade é Obrigatório' }),
  nu_fone_conjuge_fiador: z.string().min(10).max(11).nonempty({ message: 'Telefone  é Obrigatório' }),
  
  vlr_salario_conjuge_fiador: z.string().nonempty({ message: 'Renda Mensal  é Obrigatório' }),
  
  ds_filicao_pai_conjuge_fiador: z.string().nonempty({ message: 'Filiação é Obrigatório' }),
  ds_filicao_mae_conjuge_fiador: z.string().nonempty({ message: 'Filiação é Obrigatório' }),
 
  ds_local_trabalho_conjugue_fiador: z.string().nonempty({ message: 'Local de Trabalho é Obrigatório' }),
  ds_admissao_conjugue_fiador: z.date(),

  end_trabalho_conjugue_fiador: z.string().nonempty({ message: 'Endereço é Obrigatório' }),
  nu_endereco_trabalho_conjugue_fiador: z.string().max(5).nonempty({ message: 'Endereço é Obrigatório' }),
  cd_bairro_trabalho_conjugue_fiador: z.string().nonempty({ message: 'Bairro é Obrigatório' }),
  cd_cidade_trabalho_conjugue_fiador: z.string().nonempty({ message: 'Cidade é Obrigatório' }),
  cep_trabalho_conjugue_fiador: z.string().min(7).max(7).nonempty({ message: 'Cep  é Obrigatório' }),
  nu_fone_trabalho_conjugue_fiador: z.string().min(10).max(11).nonempty({ message: 'Telefone  é Obrigatório' }),

  e_mail_conjugue_fiador: z.string().nonempty({
    message: 'O e-mail é obrigatório',
  }).email({
    message: 'Formato de e-mail inválido',
  }).toLowerCase(),


  nm_contato_pr_fiador: z.string().nonempty({
    message: 'O nome é obrigatório',
  }).transform(name => {
    return name
      .trim()
      .split(' ')
      .map(word => word[0].toLocaleUpperCase().concat(word.substring(1)))
      .join(' ')
  }),
  nu_fone_contato_pr_fiador: z.string().min(10).max(11).nonempty({ message: 'Telefone  é Obrigatório' }),
  end_contato_pr_fiador: z.string().nonempty({ message: 'Endereço é Obrigatório' }),
  nm_contato_sg_fiador: z.string().nonempty({
    message: 'O nome é obrigatório',
  }).transform(name => {
    return name
      .trim()
      .split(' ')
      .map(word => word[0].toLocaleUpperCase().concat(word.substring(1)))
      .join(' ')
  }),
  nu_fone_contato_sg_fiador: z.string().min(10).max(11).nonempty({ message: 'Telefone  é Obrigatório' }),
  end_contato_sg_fiador: z.string().nonempty({ message: 'Endereço é Obrigatório' }),



})

type CreateUserData = z.infer<typeof createUserSchema>

export const TelaDeCadastro: React.FC = () => {
  const navigate = useNavigate()
  const { isAuthenticatedCliente } = useAuthContextCliente()
console.log(isAuthenticatedCliente)
  if(!isAuthenticatedCliente){
    navigate('/')
  }
  

  const [output, setOutput] = useState('')

  const createUserForm = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
  })

  async function createUser(data: CreateUserData) {

    setOutput(JSON.stringify(data, null, 2))
  }
  console.log(output)

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
    control,
  } = createUserForm;

  return (
    <div className='bg-emerald-800'>
    <main className="max-w-7xl p-6 mx-auto bg-gray-100 rounded-md shadow-md ">
      <h1 className='flex items-center justify-center font-bold'>CADASTRO DE LOCATÁRIO PESSOA FÍSICA</h1>

      <Box>
        <FormProvider {...createUserForm}>
          <form
            onSubmit={handleSubmit(createUser)}

          >
            <h2>LOCATÁRIO(A)</h2>
            <Grid container spacing={2}>

              <Grid xs={12} sm={6} md={6} lg={8}>
                <Form.Field >
                  <Form.Label htmlFor="name">
                    Nome
                  </Form.Label>
                  <Form.Input type="name" name="name" />
                  <Form.ErrorMessage field="name" />
                </Form.Field>
              </Grid>

              <Grid xs={12} sm={6} md={6} lg={2}>
                <Form.Field >
                  <Form.Label htmlFor="dateNasc">
                    Data de Nascimento
                  </Form.Label>
                  <Form.Input type="date" name="dateNasc" />
                  <Form.ErrorMessage field="dateNasc" />
                </Form.Field>
              </Grid>

              <Grid xs={12} sm={6} md={6} lg={2}>
                <Form.Field>
                  <Form.Label htmlFor="cpfCnpj">
                    CPF
                  </Form.Label>
                  <Form.Input type="text" name="cpfCnpj" />
                  <Form.ErrorMessage field="cpfCnpj" />
                </Form.Field>

              </Grid>

              <Grid xs={12} sm={6} md={6} lg={2}>
                <Form.Field>
                  <Form.Label htmlFor="rg">
                    RG
                  </Form.Label>
                  <Form.Input type="text" name="rg" />
                  <Form.ErrorMessage field="rg" />
                </Form.Field>
              </Grid>

              <Grid xs={12} sm={6} md={6} lg={2}>
                <Form.Field>
                  <Form.Label htmlFor="Nationality">
                    Nacionalidade
                  </Form.Label>
                  <Form.Input type="text" name="nationality" />
                  <Form.ErrorMessage field="nationality" />
                </Form.Field>
              </Grid>

              <Grid xs={12} sm={6} md={6} lg={8}>
                <Form.Field>
                  <Form.Label htmlFor="affiliation">
                    Filiação
                  </Form.Label>
                  <Form.Input type="text" name="affiliation" />
                  <Form.ErrorMessage field="affiliation" />
                </Form.Field>
              </Grid>

              <Grid xs={12} sm={6} md={6} lg={2}>
                <Form.Field>
                  <Form.Label htmlFor="code">
                    CEP
                  </Form.Label>
                  <Form.Input type="text" name="code" />
                  <Form.ErrorMessage field="code" />
                </Form.Field>
              </Grid>

              <Grid xs={12} sm={6} md={6} lg={6}>
                <Form.Field>
                  <Form.Label htmlFor="address">
                    Endereço
                  </Form.Label>
                  <Form.Input type="text" name="address" />
                  <Form.ErrorMessage field="address" />
                </Form.Field>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={4}>
                <Form.Field>
                  <Form.Label htmlFor="complement">
                    Complemento
                  </Form.Label>
                  <Form.Input type="text" name="complement" />
                  <Form.ErrorMessage field="complement" />
                </Form.Field>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={3}>
                <Form.Field>
                  <Form.Label htmlFor="district">
                    Bairro
                  </Form.Label>
                  <Form.Input type="text" name="district" />
                  <Form.ErrorMessage field="district" />
                </Form.Field>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={3}>
                <Form.Field>
                  <Form.Label htmlFor="city">
                    Cidade
                  </Form.Label>
                  <Form.Input type="text" name="city" />
                  <Form.ErrorMessage field="city" />
                </Form.Field>
              </Grid>


              <Grid xs={12} sm={6} md={6} lg={2}>
                <Form.Field>
                  <Form.Label htmlFor="phoneOne">
                    Telefone
                  </Form.Label>
                  <Form.Input type="text" name="phoneOne" />
                  <Form.ErrorMessage field="phoneOne" />
                </Form.Field>
              </Grid>

              <Grid xs={12} sm={6} md={6} lg={2}>
                <Form.Field>
                  <Form.Label htmlFor="phoneTwo">
                    Celular
                  </Form.Label>
                  <Form.Input type="text" name="phoneTwo" />
                  <Form.ErrorMessage field="phoneTwo" />
                </Form.Field>
              </Grid>

              <Grid xs={12} sm={6} md={6} lg={2}>
                <Form.Field>
                  <Form.Label htmlFor="whatsApp">
                    WhatsApp
                  </Form.Label>
                  <Form.Input type="text" name="whatsApp" />
                  <Form.ErrorMessage field="whatsApp" />
                </Form.Field>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={2}>
                <Form.Field>
                  <Form.Label htmlFor="maritalStatus">
                    Estado Civil
                  </Form.Label>
                  <Form.Input type="text" name="maritalStatus" />
                  <Form.ErrorMessage field="maritalStatus" />
                </Form.Field>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={2}>
                <Form.Field>
                  <Form.Label htmlFor="profession">
                    Profissão
                  </Form.Label>
                  <Form.Input type="text" name="profession" />
                  <Form.ErrorMessage field="profession" />
                </Form.Field>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={2}>
                <Form.Field>
                  <Form.Label htmlFor="monthlyIncome">
                    Renda Mensal
                  </Form.Label>
                  <Form.Input type="text" name="monthlyIncome" />
                  <Form.ErrorMessage field="monthlyIncome" />
                </Form.Field>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={4}>
                <Form.Field>
                  <Form.Label htmlFor="workplace">
                    Local de Trabalho
                  </Form.Label>
                  <Form.Input type="text" name="workplace" />
                  <Form.ErrorMessage field="workplace" />
                </Form.Field>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={2}>
                <Form.Field>
                  <Form.Label htmlFor="admission">
                    Admissão
                  </Form.Label>
                  <Form.Input type="date" name="admission" />
                  <Form.ErrorMessage field="admission" />
                </Form.Field>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={2}>
                <Form.Field>
                  <Form.Label htmlFor="codeWorkplace">
                    CEP
                  </Form.Label>
                  <Form.Input type="text" name="codeWorkplace" />
                  <Form.ErrorMessage field="codeWorkplace" />
                </Form.Field>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={6}>
                <Form.Field>
                  <Form.Label htmlFor="addressWorkplace">
                    Endereço
                  </Form.Label>
                  <Form.Input type="text" name="addressWorkplace" />
                  <Form.ErrorMessage field="addressWorkplace" />
                </Form.Field>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={4}>
                <Form.Field>
                  <Form.Label htmlFor="districtWorkplace">
                    Bairro
                  </Form.Label>
                  <Form.Input type="text" name="districtWorkplace" />
                  <Form.ErrorMessage field="districtWorkplace" />
                </Form.Field>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={3}>
                <Form.Field>
                  <Form.Label htmlFor="cityWorkplace">
                    Cidade
                  </Form.Label>
                  <Form.Input type="text" name="cityWorkplace" />
                  <Form.ErrorMessage field="cityWorkplace" />
                </Form.Field>
              </Grid>

              <Grid xs={12} sm={6} md={6} lg={2}>
                <Form.Field>
                  <Form.Label htmlFor="phoneOneWorkplace">
                    Telefone
                  </Form.Label>
                  <Form.Input type="text" name="phoneOneWorkplace" />
                  <Form.ErrorMessage field="phoneOneWorkplace" />
                </Form.Field>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={3}>
                <Form.Field>
                  <Form.Label htmlFor="email">
                    E-mail
                  </Form.Label>
                  <Form.Input type="email" name="email" />
                  <Form.ErrorMessage field="email" />
                </Form.Field>
              </Grid>

            </Grid>

            <h2 className="py-2">DADOS DO CÔNJUGE:</h2>
            <Grid container spacing={2}>

              <Grid xs={12} sm={6} md={6} lg={8}>
                <Form.Field >
                  <Form.Label htmlFor="nameSpouse">
                    Nome
                  </Form.Label>
                  <Form.Input type="text" name="nameSpouse" />
                  <Form.ErrorMessage field="nameSpouse" />
                </Form.Field>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={2}>
                <Form.Field >
                  <Form.Label htmlFor="dateNascSpouse">
                    Data de Nascimento
                  </Form.Label>
                  <Form.Input type="date" name="dateNascSpouse" />
                  <Form.ErrorMessage field="dateNascSpouse" />
                </Form.Field>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={2}>
                <Form.Field>
                  <Form.Label htmlFor="cpfCnpjSpouse">
                    CPF
                  </Form.Label>
                  <Form.Input type="text" name="cpfCnpjSpouse" />
                  <Form.ErrorMessage field="cpfCnpjSpouse" />
                </Form.Field>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={2}>
                <Form.Field>
                  <Form.Label htmlFor="rgSpouse">
                    RG
                  </Form.Label>
                  <Form.Input type="text" name="rgSpouse" />
                  <Form.ErrorMessage field="rgSpouse" />
                </Form.Field>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={2}>
                <Form.Field>
                  <Form.Label htmlFor="NationalitySpouse">
                    Nacionalidade
                  </Form.Label>
                  <Form.Input type="text" name="nationalitySpouse" />
                  <Form.ErrorMessage field="nationalitySpouse" />
                </Form.Field>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={8}>
                <Form.Field>
                  <Form.Label htmlFor="affiliationSpouse">
                    Filiação
                  </Form.Label>
                  <Form.Input type="text" name="affiliationSpouse" />
                  <Form.ErrorMessage field="affiliationSpouse" />
                </Form.Field>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={2}>
                <Form.Field>
                  <Form.Label htmlFor="professionSpouse">
                    Profissão
                  </Form.Label>
                  <Form.Input type="text" name="professionSpouse" />
                  <Form.ErrorMessage field="professionSpouse" />
                </Form.Field>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={2}>
                <Form.Field>
                  <Form.Label htmlFor="monthlyIncomeSpouse">
                    Renda Mensal
                  </Form.Label>
                  <Form.Input type="text" name="monthlyIncomeSpouse" />
                  <Form.ErrorMessage field="monthlyIncomeSpouse" />
                </Form.Field>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={4}>
                <Form.Field>
                  <Form.Label htmlFor="workplaceSpouse">
                    Local de Trabalho
                  </Form.Label>
                  <Form.Input type="text" name="workplaceSpouse" />
                  <Form.ErrorMessage field="workplaceSpouse" />
                </Form.Field>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={2}>
                <Form.Field>
                  <Form.Label htmlFor="admissionSpouse">
                    Admissão
                  </Form.Label>
                  <Form.Input type="date" name="admissionSpouse" />
                  <Form.ErrorMessage field="admissionSpouse" />
                </Form.Field>
              </Grid>

              <Grid xs={12} sm={6} md={6} lg={2}>
                <Form.Field>
                  <Form.Label htmlFor="codeWorkplaceSpouse">
                    CEP
                  </Form.Label>
                  <Form.Input type="text" name="codeWorkplaceSpouse" />
                  <Form.ErrorMessage field="codeWorkplaceSpouse" />
                </Form.Field>
              </Grid>

              <Grid xs={12} sm={6} md={6} lg={6}>
                <Form.Field>
                  <Form.Label htmlFor="addressWorkplaceSpouse">
                    Endereço
                  </Form.Label>
                  <Form.Input type="text" name="addressWorkplaceSpouse" />
                  <Form.ErrorMessage field="addressWorkplaceSpouse" />
                </Form.Field>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={3}>
                <Form.Field>
                  <Form.Label htmlFor="districtWorkplaceSpouse">
                    Bairro
                  </Form.Label>
                  <Form.Input type="text" name="districtWorkplaceSpouse" />
                  <Form.ErrorMessage field="districtWorkplaceSpouse" />
                </Form.Field>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={3}>
                <Form.Field>
                  <Form.Label htmlFor="cityWorkplaceSpouse">
                    Cidade
                  </Form.Label>
                  <Form.Input type="text" name="cityWorkplaceSpouse" />
                  <Form.ErrorMessage field="cityWorkplaceSpouse" />
                </Form.Field>
              </Grid>

              <Grid xs={12} sm={6} md={6} lg={2}>
                <Form.Field>
                  <Form.Label htmlFor="phoneOneWorkplaceSpouse">
                    Telefone
                  </Form.Label>
                  <Form.Input type="text" name="phoneOneWorkplaceSpouse" />
                  <Form.ErrorMessage field="phoneOneWorkplaceSpouse" />
                </Form.Field>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={3}>
                <Form.Field>
                  <Form.Label htmlFor="emailSpouse">
                    E-mail
                  </Form.Label>
                  <Form.Input type="email" name="emailSpouse" />
                  <Form.ErrorMessage field="emailSpouse" />
                </Form.Field>
              </Grid>
            </Grid>

            <h2 className="py-2">RESIDÊNCIA DOS ÚLTIMOS ANOS:</h2>
            <Grid container spacing={2}>

              <Grid >
                <Form.Field className="flex flex-rows gap-2">
                  <Form.Label htmlFor="optionsResidence">
                    ALUGADA
                  </Form.Label>
                  <Form.Input type="radio" name="optionsResidence" className="flex" value={'Alugada'} />

                  <Form.Label htmlFor="optionsResidence">
                    PRÓPRIA
                  </Form.Label>
                  <Form.Input type="radio" name="optionsResidence" className="flex" value={'Própria'} />

                  <Form.Label htmlFor="optionsResidence">
                    OUTROS
                  </Form.Label>
                  <Form.Input type="radio" name="optionsResidence" className="flex" value={'Outros'} />


                </Form.Field>
                <Form.ErrorMessage field="optionsResidence" />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid xs={12} sm={12} md={12} lg={12}>
                <Form.Field >
                  <Form.Label htmlFor="observation">
                    OBSERVAÇÕES
                  </Form.Label>
                  <Form.Input type="text" name="observation" />
                  <Form.ErrorMessage field="observation" />
                </Form.Field>
              </Grid>
            </Grid>

            <h2 className="py-2">INFORMAÇÕES PESSOAIS:</h2>

            <Grid container spacing={2}>
              <Grid xs={12} sm={6} md={6} lg={4}>
                <Form.Field >
                  <Form.Label htmlFor="refPersonalNameOne">
                    Ref. Pessoal: Nome:
                  </Form.Label>
                  <Form.Input type="text" name="refPersonalNameOne" />
                  <Form.ErrorMessage field="refPersonalNameOne" />
                </Form.Field>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={2}>
                <Form.Field >
                  <Form.Label htmlFor="refPersonalPhoneOne">
                    Telefone
                  </Form.Label>
                  <Form.Input type="text" name="refPersonalPhoneOne" />
                  <Form.ErrorMessage field="refPersonalPhoneOne" />
                </Form.Field>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={6}>
                <Form.Field >
                  <Form.Label htmlFor="refPersonalAddressOne">
                    Endereço
                  </Form.Label>
                  <Form.Input type="text" name="refPersonalAddressOne" />
                  <Form.ErrorMessage field="refPersonalAddressOne" />
                </Form.Field>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={4}>
                <Form.Field >
                  <Form.Label htmlFor="refPersonalNameTwo">
                    Ref. Pessoal: Nome:
                  </Form.Label>
                  <Form.Input type="text" name="refPersonalNameTwo" />
                  <Form.ErrorMessage field="refPersonalNameTwo" />
                </Form.Field>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={2}>
                <Form.Field >
                  <Form.Label htmlFor="refPersonalPhoneTwo">
                    Telefone
                  </Form.Label>
                  <Form.Input type="text" name="refPersonalPhoneTwo" />
                  <Form.ErrorMessage field="refPersonalPhoneTwo" />
                </Form.Field>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={6}>
                <Form.Field >
                  <Form.Label htmlFor="refPersonalAddressTwo">
                    Endereço
                  </Form.Label>
                  <Form.Input type="text" name="refPersonalAddressTwo" />
                  <Form.ErrorMessage field="refPersonalAddressTwo" />
                </Form.Field>
              </Grid>  

               <Grid xs={12} sm={6} md={6} lg={4}>
               <Form.Field >
                <Form.Label htmlFor="forHousingOf">
                  Para Moradia De:
                </Form.Label>
                <Form.Input type="text" name="forHousingOf" />
                <Form.ErrorMessage field="forHousingOf" />
              </Form.Field>                
                </Grid>   

              <Grid xs={12} sm={6} md={6} lg={1}>
              <Form.Field>
                <Form.Label htmlFor="numberPeople">
                  N° Pessoas:
                </Form.Label>
                <Form.Input type="number" name="numberPeople"/>
                <Form.ErrorMessage field="numberPeople" />
              </Form.Field>
              </Grid>          
              <Grid xs={12} sm={6} md={6} lg={1}>
              <Form.Field>
                <Form.Label htmlFor="numberAdults">
                  Adultos:
                </Form.Label>
                <Form.Input type="number" name="numberAdults"/>
                <Form.ErrorMessage field="numberAdults" />
              </Form.Field>
              </Grid>          
              <Grid xs={12} sm={6} md={6} lg={1}>
              <Form.Field>
                <Form.Label htmlFor="numberChildren">
                  Crianças:
                </Form.Label>
                <Form.Input type="number" name="numberChildren" />
                <Form.ErrorMessage field="numberChildren" />
              </Form.Field>
              </Grid>          
              <Grid xs={12} sm={6} md={6} lg={1}>
              <Form.Field>
                <Form.Label htmlFor="numberAnimals">
                  Animais:
                </Form.Label>
                <Form.Input type="number" name="numberAnimals" />
                <Form.ErrorMessage field="numberAnimals" />
              </Form.Field>
              </Grid>          

            </Grid>          
            <div className="py-5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-violet-500 text-white rounded px-3 h-10 font-semibold text-sm hover:bg-violet-600"
              >
                Salvar
              </button>
            </div>
          </form>
        </FormProvider>

      </Box>

    </main>

    </div>
  )
}