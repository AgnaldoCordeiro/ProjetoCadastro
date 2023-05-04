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
  const { dadosUser } = useAuthContext()

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
      <Route path="/pagina-inicial" element={<h1>Dashboard</h1>} />
      <Route path="/clientes/cadastro" element={<TelaDeCadastro />} />
      <Route path="/clientes/cadastro/:id" element={<h1>/clientes/cadastro/:id</h1>} />     

      <Route path="/usuarios" element={<ListagemDeUsuarios />} />
      <Route path="/usuarios/detalhe/:id" element={<DetalheDeUsuarios />} />
    
      
      <Route path="*" element={<Navigate to={"/pagina-inicial"} />} />
    </Routes>
  );
}