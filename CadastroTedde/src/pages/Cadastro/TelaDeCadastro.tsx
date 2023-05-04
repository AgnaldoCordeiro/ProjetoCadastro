import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react'
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ClienteService } from '../../shared/services/api/cliente/ClienteService';
import { useAuthContext } from '../../shared/contexts';



export const TelaDeCadastro: React.FC = () => {
  const navigate = useNavigate()
  const { isAuthenticatedCliente } = useAuthContext()
  if(!isAuthenticatedCliente){
    navigate('/')
  }
  return (
    <div className='bg-emerald-800'>
    <main className="max-w-7xl p-6 mx-auto bg-gray-100 rounded-md shadow-md ">
      <h1 className='flex items-center justify-center font-bold'>CADASTRO DE LOCATÁRIO PESSOA FÍSICA</h1>


    </main>

    </div>
  )
}