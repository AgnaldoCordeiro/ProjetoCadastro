import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext, useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import {
  TelaDeHome,
  TelaDeCadastro,
  ListagemDeUsuarios,
  DetalheDeUsuarios
} from "../pages";



export function AppRoutes() {
  const { setDrawerOptions } = useDrawerContext()
  const { isAuthenticatedCliente, isAuthenticated} = useAuthContext()

  useEffect(() => {
    /* {
      dadosUser?.role !== user && dadosUser?.role !== superUser ?
        setDrawerOptions([
          {
            label: 'Página Inicial',
            icon: 'home',
            path: '/pagina-inicial'
          },
          {
            label: 'Usuários',
            icon: 'people',
            path: '/usuarios'
          },
          {
            label: 'Igrejas',
            icon: 'church',
            path: '/igrejas'
          },
          {
            label: 'Parceiro de Deus',
            icon: 'paid',
            path: '/parceiro-deus-igrejas'
          },
        ])
        :
        dadosUser?.role === user ? 
        setDrawerOptions([
          {
            label: 'Página Inicial',
            icon: 'home',
            path: '/pagina-inicial'
          },
          {
            label: 'Visitantes',
            icon: 'people',
            path: '/visitantes'
          },
        ])
        :
        setDrawerOptions([
          {
            label: 'Página Inicial',
            icon: 'home',
            path: '/pagina-inicial'
          },          
          {
            label: 'Igrejas',
            icon: 'church',
            path: '/igrejas'
          },
          {
            label: 'Parceiro de Deus',
            icon: 'paid',
            path: '/parceiro-deus-igrejas'
          },
        ])

    } */

  }, [])
  return (
    <Routes>
      
      <Route path="/pagina-inicial" element={ 
        isAuthenticatedCliente === true || isAuthenticated == false ?
         <Navigate to={"/clientes/cadastro"} /> : isAuthenticatedCliente === false || isAuthenticated == true ?
         <h1>Dashboard</h1> : 
          isAuthenticatedCliente === true || isAuthenticated == true ? 
           <h1>Dashboard</h1> : <Navigate to={"/"} />
        } />
      <Route path="/clientes/cadastro" element={ <TelaDeCadastro /> } />
      <Route path="/clientes/cadastro/:id" element={<h1>/clientes/cadastro/:id</h1>} />     

      <Route path="/usuarios" element={
         isAuthenticatedCliente === true ? <Navigate to={"/clientes/cadastro"} /> :
      <ListagemDeUsuarios />} 
      />
      <Route path="/usuarios/detalhe/:id" element={
       isAuthenticatedCliente === true ? <Navigate to={"/clientes/cadastro"} /> : <DetalheDeUsuarios />} />
    
    <Route path="*" element={<Navigate to={"/pagina-inicial"} />} />
     
    </Routes>
  );
}