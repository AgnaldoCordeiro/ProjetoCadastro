import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IListagemUsers {
  id: string,
  email: string,
  password: string,
  user: string, 
  role: string,
  cpf: string,
  telefone: string
}
interface IDetalheUser {
  id: string,
  email: string,
  password: string,
  user: string, 
  role: string,
  cpf: string,
  telefone: string
}
type IUserComTotalCount = {
  data: IListagemUsers[];
  totalCount: number;
}

const getAll = async (skip = 1, search=''): Promise<IUserComTotalCount | Error> => {
  try {
    const urlRelativa = `/users?skip=${skip}&take=${Environment.LIMITE_DE_LINHAS}&search=${search}`
    const { data, headers } = await Api.get(urlRelativa)

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
      };
    }

    return new Error("Erro ao listar os usuários.")

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Erro ao listar os usuários.")

  }
 };

const getById = async (id: string): Promise<IDetalheUser | Error> => {
   try {
   
    const { data } = await Api.get(`/users/${id}`)

    if (data) {
      return data;
    }

    return new Error("Erro ao consultar o usuário.")

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Erro ao consultar o usuário.")

  }
 };

const create = async (dados: Omit<IDetalheUser, 'id'>): Promise<string | Error> => { 
  try {
   
    const { data } = await Api.post<IDetalheUser>('/users', dados)

    if (data) {
      return data.id;
    }

    return new Error("Erro ao cadastrar o usuário.")

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Erro ao cadastrar o usuário.")

  }
};

const updateById = async (dados: IDetalheUser): Promise<void | Error> => { 
  try {
   
     await Api.put('/users/',dados);    
   

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Erro ao editar o usuário.")

  }
};

const deleteById = async (id: string): Promise<void | Error> => {
   try {
   
   await Api.delete('/users/', { data: { id } });     
     
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Erro ao deletar o usuário.")

  }
};

export const UserService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}