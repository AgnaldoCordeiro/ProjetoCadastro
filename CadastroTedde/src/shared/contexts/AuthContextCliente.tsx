import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { AuthServiceCliente } from "../services/api/auth/AuthServiceCliente";



interface IDadosClienteProps {
  cgc_pessoa?: string | undefined;
}

interface IAuthContextDataCliente {
  logoutCliente: () => void;
  isAuthenticatedCliente: boolean;
  loginCliente: (cgc_pessoa: string) => Promise<string | void>;
  dadosCliente: IDadosClienteProps | undefined
}
const AuthContextCliente = createContext({} as IAuthContextDataCliente);

const LOCAL_STORAGE_KEY__ACCESS_TOKEN_CLIENTE = 'APP_ACCESS_TOKEN_CLIENTE';
const LOCAL_STORAGE_KEY__ACCESS_CLIENTE = 'APP_ACCESS_CLIENTE';

interface IAuthProviderClienteProps {
  children: React.ReactNode;
}


export const AuthProviderCliente: React.FC<IAuthProviderClienteProps> = ({ children }) => {
  const [tokenCliente, setTokenCliente] = useState<string>()
  const [dadosCliente, setDadosCliente] = useState<IDadosClienteProps>()

  useEffect(() => {
    const tokenCliente = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN_CLIENTE);
    const dadosCliente = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_CLIENTE);

    if (tokenCliente && dadosCliente) {
      setTokenCliente(JSON.parse(tokenCliente))
      setDadosCliente(JSON.parse(dadosCliente))
    } else {
      setTokenCliente(undefined)
      setDadosCliente(undefined)
    }
  }, [])

  const handleLoginCliente = useCallback(async (cgc_pessoa: string) => {
    const result = await AuthServiceCliente.authClienteLogin(cgc_pessoa)

    if (result instanceof Error) {
      return result.message
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN_CLIENTE, JSON.stringify(result.token))
      localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_CLIENTE, JSON.stringify(result.cliente))
      setTokenCliente(result.token)
      setDadosCliente(result.cliente)
    }
  }, [])
  const handleLogoutCliente = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN_CLIENTE)
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_CLIENTE)
    setTokenCliente(undefined)
    setDadosCliente(undefined)

  }, [])

  const isAuthenticatedCliente = useMemo(() => !!tokenCliente, [tokenCliente])
  return (
    <AuthContextCliente.Provider value={{ dadosCliente, isAuthenticatedCliente, loginCliente: handleLoginCliente, logoutCliente: handleLogoutCliente }}>
      {children}
    </AuthContextCliente.Provider>

  );
}

export const useAuthContextCliente = () => useContext(AuthContextCliente)