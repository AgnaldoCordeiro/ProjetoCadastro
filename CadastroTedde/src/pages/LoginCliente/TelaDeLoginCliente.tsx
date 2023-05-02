import { Form } from "../../shared/components/form"
import { useForm, FormProvider, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from "react"
import { useAuthContextCliente } from "../../shared/contexts"
import { useNavigate } from "react-router-dom"


const loginSchema = z.object({
    cgc_pessoa: z.string().min(11).max(14).nonempty({ message: 'CPF / CNPJ  é Obrigatório' }),
  });

  interface ILoginProps {
    children: React.ReactNode;
  }

  type LoginInputs = z.infer<typeof loginSchema>


  
  export const TelaDeLoginCliente: React.FC<ILoginProps> = ({ children }) => {
    const navigate = useNavigate()
  const createUserForm = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
  })
    const [isLoading, setIsLoading] = useState(false)
     const { isAuthenticatedCliente, loginCliente } = useAuthContextCliente()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
      } = useForm<LoginInputs>();

      async function onSubmit(data: LoginInputs) {
        setIsLoading(true)
        loginCliente(data.cgc_pessoa)
        .then(() => {
          setIsLoading(false);
          navigate('/cliente/cadastro')
        })
        .catch((err) => {
          setError("cgc_pessoa", { type: "manual", message: err.message });
        });
       
      }

      
  if (isAuthenticatedCliente) return (
    <>{children}</>
  )
 
  
    return (
       
         <div className="flex h-screen w-full items-center justify-center bg-emerald-900 bg-cover bg-no-repeat background-image:url('https://images.unsplash.com/photo-1499123785106-343e69e68db1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80')">
          <div className="rounded-xl bg-gray-100 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
            <div className="text-emerald-900">
               <div className="mb-8 flex flex-col items-center">
                <img src="./Logo.png" width="150" alt="" srcSet="" />
                
                <span className="text-emerald-900 font-bold pt-5">Informe seu CPF/CNPJ</span>
              </div> 
              <FormProvider {...createUserForm}>

              <form  onSubmit={ handleSubmit(onSubmit)}>
             
              <Form.Field >
                  <Form.Label htmlFor="cgc_pessoa">
                    CPF / CNPJ
                  </Form.Label>
                  <Form.Input type="name" name="cgc_pessoa" />
                  <Form.ErrorMessage field="cgc_pessoa" />
                </Form.Field>             
                
                <div className="mt-8 flex justify-center text-lg text-black">
                  <button type="submit" className="rounded-3xl bg-emerald-800 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-emerald-500">Acessar</button>
                </div> 
              </form>
              </FormProvider>
            </div>
          </div>
        </div>
    
    )
}