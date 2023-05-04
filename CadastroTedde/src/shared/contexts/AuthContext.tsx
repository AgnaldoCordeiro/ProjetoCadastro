import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { AuthService } from "../services/api/auth/AuthService";
import { AuthServiceCliente } from "../services/api/auth/AuthServiceCliente";

interface IDadosUserProps {
  role?: string | undefined;
}
interface IDadosClienteProps {
  cgc_pessoa?: string | undefined;
}

interface IAuthContextData {
  logout: () => void;
  logoutCliente: () => void;
  isAuthenticated: boolean;
  isAuthenticatedCliente: boolean;
  login: (user: string, password: string) => Promise<string | void>;
  loginCliente: (cgc_pessoa: string) => Promise<string | void>;
  dadosUser: IDadosUserProps | undefined
  dadosCliente: IDadosClienteProps | undefined
}
const AuthContext = createContext({} as IAuthContextData);

const LOCAL_STORAGE_KEY__ACCESS_TOKEN = 'APP_ACCESS_TOKEN';
const LOCAL_STORAGE_KEY__ACCESS_USER = 'APP_ACCESS_USER';
const LOCAL_STORAGE_KEY__ACCESS_TOKEN_CLIENTE = 'APP_ACCESS_TOKEN_CLIENTE';
const LOCAL_STORAGE_KEY__ACCESS_CLIENTE = 'APP_ACCESS_CLIENTE';


interface IAuthProviderProps {
  children: React.ReactNode;
}


export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>()
  const [dadosUser, setDadosUser] = useState<IDadosUserProps>()
  const [tokenCliente, setTokenCliente] = useState<string>()
  const [dadosCliente, setDadosCliente] = useState<IDadosClienteProps>()


  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    const dadosUser = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_USER);

    if (token && dadosUser) {
      setToken(JSON.parse(token))
      setDadosUser(JSON.parse(dadosUser))
    } else {
      setToken(undefined)
      setDadosUser(undefined)
    }
  }, [])

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

  const handleLogin = useCallback(async (user: string, password: string) => {
   
    const result = await AuthService.auth(user, password)

    if (result instanceof Error) {
      return result.message
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, JSON.stringify(result.token))
      localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_USER, JSON.stringify(result.user))
      setToken(result.token)
      setDadosUser(result.user)
    }
  }, [])
  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN)
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_USER)
    setToken(undefined)
    setDadosUser(undefined)

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

  const isAuthenticated = useMemo(() => !!token, [token])
  const isAuthenticatedCliente = useMemo(() => !!tokenCliente, [tokenCliente])
  return (
    <AuthContext.Provider value={{dadosCliente, isAuthenticatedCliente, loginCliente: handleLoginCliente, logoutCliente: handleLogoutCliente, dadosUser, isAuthenticated, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>

  );
}

export const useAuthContext = () => useContext(AuthContext)
