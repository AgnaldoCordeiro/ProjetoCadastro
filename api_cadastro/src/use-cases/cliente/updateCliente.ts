import { AppError } from "../../errors/AppError";
import dayjs from "dayjs";
import { ClienteRepository } from "../../repositories/cliente-repositories";


interface ClienteUpdateDataRequest {
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
 
export class ClienteUpdateData{
  constructor(
    private clienteRepository: ClienteRepository,
  ) { }
  
  async execute(request: ClienteUpdateDataRequest) {
    const { cgc_pessoa,
      nm_pessoa,
      nm_fantasia_pessoa,
      rg_pessoa,
      cd_expedidor_pessoa,
      ds_naturalidade_pessoa,
      dt_nascimento_pessoa,
      ie_pessoa,
      cd_estado_civil_pessoa,
      im_pessoa,
      cd_profissao_pessoa,
      end_pessoa,
      cd_bairro_pessoa,
      nu_endereco_pessoa,
      cep_pessoa,
      end_complemento_pessoa,
      cd_cidade_pessoa,
      cd_tipo_logradouro_pessoa,
      nu_fone_pessoa,
      nm_conjuge,
      cd_profissao_conjuge,
      cd_expedidor_conjuge,
      nu_celular_pessoa,
      cic_conjuge,
      rg_conjuge,
      dt_nascimento_conjuge,
      nu_caixa_postal_pessoa,
      tipo_pessoa,
      e_mail_pessoa,
      nm_contato,
      dt_nascimento_contato,
      end_cobranca,
      nu_endereco_cobranca,
      end_complemento_cobranca,
      cd_bairro_cobranca,
      ds_bairro_cobranca,
      cd_tipo_logradouro_cobranca,
      cd_cidade_cobranca,
      ds_cidade_cobranca,
      uf_cobranca,
      cep_cobranca,
      nu_caixa_postal_cobranca,
      obs_pessoa,
      cd_escolaridade,
      sexo,
      vlr_salario,
      e_mail_extrato,
      nu_fone_zap,
      matricula_afiancado_imovel,
      end_imovel_afiancado,
      cd_cidade_afiancado,
      nm_contato_fiador,
      nu_fone_contato_fiador,
      nu_fone_comercial_fiador,
      cd_bairro_fiador,
      cd_bairro_trabalho,
      cd_bairro_trabalho_conjugue,
      cd_bairro_trabalho_conjugue_fiador,
      cd_bairro_trabalho_fiador,
      cd_cidade_fiador,
      ds_info_imovel_fiador,
      cd_cidade_trabalho,
      cd_cidade_trabalho_conjugue,
      cd_cidade_trabalho_conjugue_fiador,
      cd_cidade_trabalho_fiador,
      cd_escolaridade_fiador,
      cd_estado_civil_fiador,
      cd_expedidor_conjuge_fiador,
      cd_expedidor_fiador,
      cd_profissao_conjuge_fiador,
      cd_profissao_fiador,
      cd_tipo_logradouro_fiador,
      cep_fiador,
      cep_trabalho,
      cep_trabalho_conjugue,
      cep_trabalho_conjugue_fiador,
      cep_trabalho_fiador,
      cic_conjuge_fiador,
      cis_fiador,
      ds_admissao,
      ds_admissao_conjugue,
      ds_admissao_conjugue_fiador,
      ds_admissao_fiador,
      ds_filicao_mae_conjuge,
      ds_filicao_mae_conjuge_fiador,
      ds_filicao_mae_fiador,
      ds_filicao_mae_pessoa,
      ds_filicao_pai_conjuge,
      ds_filicao_pai_conjuge_fiador,
      ds_filicao_pai_fiador,
      ds_filicao_pai_pessoa,
      ds_local_trabalho,
      ds_local_trabalho_conjugue,
      ds_local_trabalho_conjugue_fiador,
      ds_local_trabalho_fiador,
      ds_naturalidade_conjuge,
      ds_naturalidade_conjuge_fiador,
      ds_naturalidade_fiador,
      ds_pessoas_qi_morar,
      dt_cadastro_fiador,
      dt_nascimento_conjuge_fiador,
      dt_nascimento_fiador,
      e_mail_conjugue,
      e_mail_conjugue_fiador,
      e_mail_fiador,
      end_complemento_fiador,
      end_contato,
      end_contato_pr_fiador,
      end_contato_sg,
      end_contato_sg_fiador,
      end_fiador,
      end_trabalho,
      end_trabalho_conjugue,
      end_trabalho_conjugue_fiador,
      end_trabalho_fiador,
      ie_fiador,
      im_fiador,
      nm_adultos,
      nm_conjuge_fiador,
      nm_contato_pr_fiador,
      nm_contato_sg,
      nm_contato_sg_fiador,
      nm_criancas,
      nm_fantasia_fiador,
      nm_fiador,
      nm_pessoas,
      nu_celular_conjuge,
      nu_celular_conjuge_fiador,
      nu_celular_fiador,
      nu_endereco_fiador,
      nu_endereco_trabalho,
      nu_endereco_trabalho_conjugue,
      nu_endereco_trabalho_conjugue_fiador,
      nu_endereco_trabalho_fiador,
      nu_fone_contato,
      nu_fone_contato_pr_fiador,
      nu_fone_contato_sg,
      nu_fone_contato_sg_fiador,
      nu_fone_fiador,
      nu_fone_trabalho,
      nu_fone_trabalho_conjugue,
      nu_fone_trabalho_conjugue_fiador,
      nu_fone_trabalho_fiador,
      nu_fone_zap_fiador,
      num_animais,
      obs_fiador,
      rg_conjuge_fiador,
      rg_fiador,
      tipo_fiador,
      vlr_salario_conjuge,
      vlr_salario_conjuge_fiador,
      vlr_salario_fiador,
      ds_info_imovel_fiador_one,
      cis_fiador_one,
      nm_fiador_one,
      ds_filicao_pai_fiador_one,
      ds_filicao_mae_fiador_one,
      nm_fantasia_fiador_one,
      rg_fiador_one,
      cd_expedidor_fiador_one,
      ds_naturalidade_fiador_one,
      dt_nascimento_fiador_one,
      ie_fiador_one,
      cd_estado_civil_fiador_one,
      im_fiador_one,
      cd_profissao_fiador_one,
      end_fiador_one,
      cd_bairro_fiador_one,
      nu_endereco_fiador_one,
      cep_fiador_one,
      end_complemento_fiador_one,
      cd_cidade_fiador_one,
      cd_tipo_logradouro_fiador_one,
      nu_fone_fiador_one,
      nu_celular_fiador_one,
      tipo_fiador_one,
      e_mail_fiador_one,
      obs_fiador_one,
      cd_escolaridade_fiador_one,
      vlr_salario_fiador_one,
      nu_fone_zap_fiador_one,
      ds_info_imovel_fiador_two,
      cis_fiador_two,
      nm_fiador_two,
      ds_filicao_pai_fiador_two,
      ds_filicao_mae_fiador_two,
      nm_fantasia_fiador_two,
      rg_fiador_two,
      cd_expedidor_fiador_two,
      ds_naturalidade_fiador_two,
      dt_nascimento_fiador_two,
      ie_fiador_two,
      cd_estado_civil_fiador_two,
      im_fiador_two,
      cd_profissao_fiador_two,
      end_fiador_two,
      cd_bairro_fiador_two,
      nu_endereco_fiador_two,
      cep_fiador_two,
      end_complemento_fiador_two,
      cd_cidade_fiador_two,
      cd_tipo_logradouro_fiador_two,
      nu_fone_fiador_two,
      nu_celular_fiador_two,
      tipo_fiador_two,
      e_mail_fiador_two,
      obs_fiador_two,
      cd_escolaridade_fiador_two,
      vlr_salario_fiador_two,
      nu_fone_zap_fiador_two,
      banco,
      nu_fone_banco,
      conta,
      fornecedor,
      nu_fone_fornecedor } = request;

  
    const dataAtualizada = new Date()
   
    await this.clienteRepository.update({
      cgc_pessoa,
      nm_pessoa,
      nm_fantasia_pessoa,
      rg_pessoa,
      cd_expedidor_pessoa,
      ds_naturalidade_pessoa,
      dt_nascimento_pessoa,
      ie_pessoa,
      cd_estado_civil_pessoa,
      im_pessoa,
      cd_profissao_pessoa,
      end_pessoa,
      cd_bairro_pessoa,
      nu_endereco_pessoa,
      cep_pessoa,
      end_complemento_pessoa,
      cd_cidade_pessoa,
      cd_tipo_logradouro_pessoa,
      nu_fone_pessoa,
      nm_conjuge,
      cd_profissao_conjuge,
      cd_expedidor_conjuge,
      nu_celular_pessoa,
      cic_conjuge,
      rg_conjuge,
      dt_nascimento_conjuge,
      nu_caixa_postal_pessoa,
      tipo_pessoa,
      e_mail_pessoa,
      nm_contato,
      dt_nascimento_contato,
      end_cobranca,
      nu_endereco_cobranca,
      end_complemento_cobranca,
      cd_bairro_cobranca,
      ds_bairro_cobranca,
      cd_tipo_logradouro_cobranca,
      cd_cidade_cobranca,
      ds_cidade_cobranca,
      uf_cobranca,
      cep_cobranca,
      nu_caixa_postal_cobranca,
      obs_pessoa,
      cd_escolaridade,
      sexo,
      vlr_salario,
      e_mail_extrato,
      nu_fone_zap,
      matricula_afiancado_imovel,
      end_imovel_afiancado,
      cd_cidade_afiancado,
      nm_contato_fiador,
      nu_fone_contato_fiador,
      nu_fone_comercial_fiador,
      cd_bairro_fiador,
      cd_bairro_trabalho,
      cd_bairro_trabalho_conjugue,
      cd_bairro_trabalho_conjugue_fiador,
      cd_bairro_trabalho_fiador,
      cd_cidade_fiador,
      ds_info_imovel_fiador,
      cd_cidade_trabalho,
      cd_cidade_trabalho_conjugue,
      cd_cidade_trabalho_conjugue_fiador,
      cd_cidade_trabalho_fiador,
      cd_escolaridade_fiador,
      cd_estado_civil_fiador,
      cd_expedidor_conjuge_fiador,
      cd_expedidor_fiador,
      cd_profissao_conjuge_fiador,
      cd_profissao_fiador,
      cd_tipo_logradouro_fiador,
      cep_fiador,
      cep_trabalho,
      cep_trabalho_conjugue,
      cep_trabalho_conjugue_fiador,
      cep_trabalho_fiador,
      cic_conjuge_fiador,
      cis_fiador,
      ds_admissao,
      ds_admissao_conjugue,
      ds_admissao_conjugue_fiador,
      ds_admissao_fiador,
      ds_filicao_mae_conjuge,
      ds_filicao_mae_conjuge_fiador,
      ds_filicao_mae_fiador,
      ds_filicao_mae_pessoa,
      ds_filicao_pai_conjuge,
      ds_filicao_pai_conjuge_fiador,
      ds_filicao_pai_fiador,
      ds_filicao_pai_pessoa,
      ds_local_trabalho,
      ds_local_trabalho_conjugue,
      ds_local_trabalho_conjugue_fiador,
      ds_local_trabalho_fiador,
      ds_naturalidade_conjuge,
      ds_naturalidade_conjuge_fiador,
      ds_naturalidade_fiador,
      ds_pessoas_qi_morar,
      dt_cadastro_fiador,
      dt_nascimento_conjuge_fiador,
      dt_nascimento_fiador,
      e_mail_conjugue,
      e_mail_conjugue_fiador,
      e_mail_fiador,
      end_complemento_fiador,
      end_contato,
      end_contato_pr_fiador,
      end_contato_sg,
      end_contato_sg_fiador,
      end_fiador,
      end_trabalho,
      end_trabalho_conjugue,
      end_trabalho_conjugue_fiador,
      end_trabalho_fiador,
      ie_fiador,
      im_fiador,
      nm_adultos,
      nm_conjuge_fiador,
      nm_contato_pr_fiador,
      nm_contato_sg,
      nm_contato_sg_fiador,
      nm_criancas,
      nm_fantasia_fiador,
      nm_fiador,
      nm_pessoas,
      nu_celular_conjuge,
      nu_celular_conjuge_fiador,
      nu_celular_fiador,
      nu_endereco_fiador,
      nu_endereco_trabalho,
      nu_endereco_trabalho_conjugue,
      nu_endereco_trabalho_conjugue_fiador,
      nu_endereco_trabalho_fiador,
      nu_fone_contato,
      nu_fone_contato_pr_fiador,
      nu_fone_contato_sg,
      nu_fone_contato_sg_fiador,
      nu_fone_fiador,
      nu_fone_trabalho,
      nu_fone_trabalho_conjugue,
      nu_fone_trabalho_conjugue_fiador,
      nu_fone_trabalho_fiador,
      nu_fone_zap_fiador,
      num_animais,
      obs_fiador,
      rg_conjuge_fiador,
      rg_fiador,
      tipo_fiador,
      vlr_salario_conjuge,
      vlr_salario_conjuge_fiador,
      vlr_salario_fiador,
      ds_info_imovel_fiador_one,
      cis_fiador_one,
      nm_fiador_one,
      ds_filicao_pai_fiador_one,
      ds_filicao_mae_fiador_one,
      nm_fantasia_fiador_one,
      rg_fiador_one,
      cd_expedidor_fiador_one,
      ds_naturalidade_fiador_one,
      dt_nascimento_fiador_one,
      ie_fiador_one,
      cd_estado_civil_fiador_one,
      im_fiador_one,
      cd_profissao_fiador_one,
      end_fiador_one,
      cd_bairro_fiador_one,
      nu_endereco_fiador_one,
      cep_fiador_one,
      end_complemento_fiador_one,
      cd_cidade_fiador_one,
      cd_tipo_logradouro_fiador_one,
      nu_fone_fiador_one,
      nu_celular_fiador_one,
      tipo_fiador_one,
      e_mail_fiador_one,
      obs_fiador_one,
      cd_escolaridade_fiador_one,
      vlr_salario_fiador_one,
      nu_fone_zap_fiador_one,
      ds_info_imovel_fiador_two,
      cis_fiador_two,
      nm_fiador_two,
      ds_filicao_pai_fiador_two,
      ds_filicao_mae_fiador_two,
      nm_fantasia_fiador_two,
      rg_fiador_two,
      cd_expedidor_fiador_two,
      ds_naturalidade_fiador_two,
      dt_nascimento_fiador_two,
      ie_fiador_two,
      cd_estado_civil_fiador_two,
      im_fiador_two,
      cd_profissao_fiador_two,
      end_fiador_two,
      cd_bairro_fiador_two,
      nu_endereco_fiador_two,
      cep_fiador_two,
      end_complemento_fiador_two,
      cd_cidade_fiador_two,
      cd_tipo_logradouro_fiador_two,
      nu_fone_fiador_two,
      nu_celular_fiador_two,
      tipo_fiador_two,
      e_mail_fiador_two,
      obs_fiador_two,
      cd_escolaridade_fiador_two,
      vlr_salario_fiador_two,
      nu_fone_zap_fiador_two,
      banco,
      nu_fone_banco,
      conta,
      fornecedor,
      nu_fone_fornecedor,
    })
  }
}