import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IListagemClientes {
  cgc_pessoa: string,
}
interface ICreateCliente{
  cgc_pessoa: string;
}
export interface IUpdateCliente{
  cgc_pessoa: string;
  nm_pessoa?: string;
  nm_fantasia_pessoa?: string;
  rg_pessoa?: string;
  cd_expedidor_pessoa?: string;
  ds_naturalidade_pessoa?: string;
  dt_nascimento_pessoa?: Date;
  ie_pessoa?: string;
  cd_estado_civil_pessoa?: string;
  im_pessoa?: string;
  cd_profissao_pessoa?: number;
  end_pessoa?: string;
  cd_bairro_pessoa?: number;
  nu_endereco_pessoa?: string;
  cep_pessoa?: string;
  end_complemento_pessoa?: string;
  cd_cidade_pessoa?: string;
  cd_tipo_logradouro_pessoa?: string;
  nu_fone_pessoa?: string;
  nm_conjuge?: string;
  cd_profissao_conjuge?: string;
  cd_expedidor_conjuge?: string;
  nu_celular_pessoa?: string;
  cic_conjuge?: string;
  rg_conjuge?: string;
  dt_nascimento_conjuge?: Date;
  nu_caixa_postal_pessoa?: string;
  tipo_pessoa?: string;
  e_mail_pessoa?: string;
  nm_contato?: string;
  dt_nascimento_contato?: Date;
  end_cobranca?: string;
  nu_endereco_cobranca?: string;
  end_complemento_cobranca?: string;
  cd_bairro_cobranca?: string;
  ds_bairro_cobranca?: string;
  cd_tipo_logradouro_cobranca?: string;
  cd_cidade_cobranca?: string;
  ds_cidade_cobranca?: string;
  uf_cobranca?: string;
  cep_cobranca?: string;
  nu_caixa_postal_cobranca?: string;
  obs_pessoa?: string;
  cd_escolaridade?: number;
  sexo?: string;
  vlr_salario?: number;
  e_mail_extrato?: string;
  nu_fone_zap?: number;
  matricula_afiancado_imovel?: string;
  end_imovel_afiancado?: string;
  cd_cidade_afiancado?: number;
  nm_contato_fiador?: string;
  nu_fone_contato_fiador?: string;
  nu_fone_comercial_fiador?: string;
  cd_bairro_fiador?: number;
  cd_bairro_trabalho?: number;
  cd_bairro_trabalho_conjugue?: number;
  cd_bairro_trabalho_conjugue_fiador?: number;
  cd_bairro_trabalho_fiador?: number;
  cd_cidade_fiador?: string;
  ds_info_imovel_fiador?: string;
  cd_cidade_trabalho?: string;
  cd_cidade_trabalho_conjugue?: string;
  cd_cidade_trabalho_conjugue_fiador?: string;
  cd_cidade_trabalho_fiador?: string;
  cd_escolaridade_fiador?: number;
  cd_estado_civil_fiador?: string;
  cd_expedidor_conjuge_fiador?: string;
  cd_expedidor_fiador?: string;
  cd_profissao_conjuge_fiador?: string;
  cd_profissao_fiador?: number;
  cd_tipo_logradouro_fiador?: string;
  cep_fiador?: string;
  cep_trabalho?: string;
  cep_trabalho_conjugue?: string;
  cep_trabalho_conjugue_fiador?: string;
  cep_trabalho_fiador?: string;
  cic_conjuge_fiador?: string;
  cis_fiador?: string;
  ds_admissao?: Date;
  ds_admissao_conjugue?: Date;
  ds_admissao_conjugue_fiador?: Date;
  ds_admissao_fiador?: Date;
  ds_filicao_mae_conjuge?: string;
  ds_filicao_mae_conjuge_fiador?: string;
  ds_filicao_mae_fiador?: string;
  ds_filicao_mae_pessoa?: string;
  ds_filicao_pai_conjuge?: string;
  ds_filicao_pai_conjuge_fiador?: string;
  ds_filicao_pai_fiador?: string;
  ds_filicao_pai_pessoa?: string;
  ds_local_trabalho?: string;
  ds_local_trabalho_conjugue?: string;
  ds_local_trabalho_conjugue_fiador?: string;
  ds_local_trabalho_fiador?: string;
  ds_naturalidade_conjuge?: string;
  ds_naturalidade_conjuge_fiador?: string;
  ds_naturalidade_fiador?: string;
  ds_pessoas_qi_morar?: string;
  dt_cadastro_fiador?: Date;
  dt_nascimento_conjuge_fiador?: Date;
  dt_nascimento_fiador?: Date;
  e_mail_conjugue?: string;
  e_mail_conjugue_fiador?: string;
  e_mail_fiador?: string;
  end_complemento_fiador?: string;
  end_contato?: string;
  end_contato_pr_fiador?: string;
  end_contato_sg?: string;
  end_contato_sg_fiador?: string;
  end_fiador?: string;
  end_trabalho?: string;
  end_trabalho_conjugue?: string;
  end_trabalho_conjugue_fiador?: string;
  end_trabalho_fiador?: string;
  ie_fiador?: string;
  im_fiador?: string;
  nm_adultos?: number;
  nm_conjuge_fiador?: string;
  nm_contato_pr_fiador?: string;
  nm_contato_sg?: string;
  nm_contato_sg_fiador?: string;
  nm_criancas?: number;
  nm_fantasia_fiador?: string;
  nm_fiador?: string;
  nm_pessoas?: number;
  nu_celular_conjuge?: string;
  nu_celular_conjuge_fiador?: string;
  nu_celular_fiador?: string;
  nu_endereco_fiador?: string;
  nu_endereco_trabalho?: string;
  nu_endereco_trabalho_conjugue?: string;
  nu_endereco_trabalho_conjugue_fiador?: string;
  nu_endereco_trabalho_fiador?: string;
  nu_fone_contato?: string;
  nu_fone_contato_pr_fiador?: string;
  nu_fone_contato_sg?: string;
  nu_fone_contato_sg_fiador?: string;
  nu_fone_fiador?: string;
  nu_fone_trabalho?: string;
  nu_fone_trabalho_conjugue?: string;
  nu_fone_trabalho_conjugue_fiador?: string;
  nu_fone_trabalho_fiador?: string;
  nu_fone_zap_fiador?: number;
  num_animais?: number;
  obs_fiador?: string;
  rg_conjuge_fiador?: string;
  rg_fiador?: string;
  tipo_fiador?: string;
  vlr_salario_conjuge?: number;
  vlr_salario_conjuge_fiador?: number;
  vlr_salario_fiador?: number;
  ds_info_imovel_fiador_one?: string;
  cis_fiador_one?: string;
  nm_fiador_one?: string;
  ds_filicao_pai_fiador_one?: string;
  ds_filicao_mae_fiador_one?: string;
  nm_fantasia_fiador_one?: string;
  rg_fiador_one?: string;
  cd_expedidor_fiador_one?: string;
  ds_naturalidade_fiador_one?: string;
  dt_nascimento_fiador_one?: Date;
  ie_fiador_one?: string;
  cd_estado_civil_fiador_one?: string;
  im_fiador_one?: string;
  cd_profissao_fiador_one?: number;
  end_fiador_one?: string;
  cd_bairro_fiador_one?: number;
  nu_endereco_fiador_one?: string;
  cep_fiador_one?: string;
  end_complemento_fiador_one?: string;
  cd_cidade_fiador_one?: string;
  cd_tipo_logradouro_fiador_one?: string;
  nu_fone_fiador_one?: string;
  nu_celular_fiador_one?: string;
  tipo_fiador_one?: string;
  e_mail_fiador_one?: string;
  obs_fiador_one?: string;
  cd_escolaridade_fiador_one?: number;
  vlr_salario_fiador_one?: number;
  nu_fone_zap_fiador_one?: number;
  ds_info_imovel_fiador_two?: string;
  cis_fiador_two?: string;
  nm_fiador_two?: string;
  ds_filicao_pai_fiador_two?: string;
  ds_filicao_mae_fiador_two?: string;
  nm_fantasia_fiador_two?: string;
  rg_fiador_two?: string;
  cd_expedidor_fiador_two?: string;
  ds_naturalidade_fiador_two?: string;
  dt_nascimento_fiador_two?: Date;
  ie_fiador_two?: string;
  cd_estado_civil_fiador_two?: string;
  im_fiador_two?: string;
  cd_profissao_fiador_two?: number;
  end_fiador_two?: string;
  cd_bairro_fiador_two?: number;
  nu_endereco_fiador_two?: string;
  cep_fiador_two?: string;
  end_complemento_fiador_two?: string;
  cd_cidade_fiador_two?: string;
  cd_tipo_logradouro_fiador_two?: string;
  nu_fone_fiador_two?: string;
  nu_celular_fiador_two?: string;
  tipo_fiador_two?: string;
  e_mail_fiador_two?: string;
  obs_fiador_two?: string;
  cd_escolaridade_fiador_two?: number;
  vlr_salario_fiador_two?: number;
  nu_fone_zap_fiador_two?: number;
  banco?: string;
  nu_fone_banco?: string;
  conta?: string;
  fornecedor?: string;
  nu_fone_fornecedor?: string;
}
type IClienteComTotalCount = {
  data: IListagemClientes[];
  totalCount: number;
}

const getAll = async (skip = 1, search=''): Promise<IClienteComTotalCount | Error> => {
  try {
    const urlRelativa = `/clientes?skip=${skip}&take=${Environment.LIMITE_DE_LINHAS}&search=${search}`
    const { data, headers } = await Api.get(urlRelativa)

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
      };
    }

    return new Error("Erro ao listar os Clientes.")

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Erro ao listar os Clientes.")

  }
 };

const create = async (dados: ICreateCliente): Promise<string | Error> => { 
  try {
   
    const { data } = await Api.post<ICreateCliente>('/clientes', dados)

    if (data) {
      return data.cgc_pessoa;
    }

    return new Error("Erro ao cadastrar o Cliente.")

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Erro ao cadastrar o Cliente.")

  }
};

const updateById = async (dados: IUpdateCliente): Promise<void | Error> => { 
  try {
   
     await Api.put('/clientes/',dados);    
   

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Erro ao editar o Cliente.")

  }
};

const getById = async (cgc_pessoa: string): Promise<IUpdateCliente | Error> => {
  try {
  
   const { data } = await Api.get(`/clientes/${cgc_pessoa}`)

   if (data) {
     return data;
   }

   return new Error("Erro ao consultar o cliente.")

 } catch (error) {
   console.error(error);
   return new Error((error as { message: string }).message || "Erro ao consultar o cliente.")

 }
};



export const ClienteService = {
  getAll,
  getById,
  create,
  updateById,
}