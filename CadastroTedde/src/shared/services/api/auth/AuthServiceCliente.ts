import { Api } from "../axios-config";

interface IAuth {
  token: string;
  cliente: {
    cgc_pessoa: string;
  }
}

const authClienteLogin = async (cgc_pessoa:string): Promise<IAuth | Error > => {
   try {
   
    const {data}  = await Api.post<IAuth>('/sessions-cliente', {cgc_pessoa})

     if (data) {
       return data;
     }
    return new Error("Erro Cliente")

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Erro Cliente")

  }
}

export const AuthServiceCliente = {
  authClienteLogin,
};