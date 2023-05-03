import { Form } from "../../shared/components/form"
import { useForm, FormProvider, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from "react"
import { useAuthContext } from "../../shared/contexts"
import { useNavigate } from "react-router-dom"




  interface ILoginColaboradorProps {
    children: React.ReactNode;
  }
  const createUserSchema = z.object({   
    user: z.string().nonempty({
      message: 'O Usuário é obrigatório',
    }),
    password: z.string().nonempty({
      message: 'A senha é obrigatória',
    }).min(6, {
      message: 'A senha precisa ter no mínimo 6 caracteres',
    }),   
   
  })
  
  type CreateUserData = z.infer<typeof createUserSchema>


  
  export const TelaDeLoginColaborador: React.FC<ILoginColaboradorProps> = ({ children }) => {
    const navigate = useNavigate()   
    const [isLoading, setIsLoading] = useState(false)
    const { isAuthenticated, login } = useAuthContext()

    const createUserForm = useForm<CreateUserData>({
      resolver: zodResolver(createUserSchema),
    })
    const { 
      handleSubmit, 
      formState: { isSubmitting }, 
      watch,
      control,
    } = createUserForm;
  
     async function onSubmitLogin(data: CreateUserData) {     
        setIsLoading(true)          
        login(data.user, data.password) 
        .then(() => {
          setIsLoading(false);
          navigate('/dashboard')
        })       
      }

      
  if (isAuthenticated) return (
    <>{children}</>
  )
    return (
       
         <div className="flex h-screen w-full items-center justify-center bg-emerald-900 bg-cover bg-no-repeat background-image:url('https://images.unsplash.com/photo-1499123785106-343e69e68db1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80')">
          <div className="rounded-xl bg-gray-100 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
            <div className="text-emerald-900">
               <div className="mb-8 flex flex-col items-center">
                <img src="./Logo.png" width="150" alt="" srcSet="" />                
                <span className="text-emerald-900 font-bold pt-5">Area de Acesso Colaborador</span>
              </div> 
              <FormProvider {...createUserForm}>
              <form  onSubmit={ handleSubmit(onSubmitLogin)}>             
              <Form.Field >
                  <Form.Label htmlFor="user">
                    Usuário
                  </Form.Label>
                  <Form.Input type="name" name="user"  />
                  <Form.ErrorMessage field="user" />
                </Form.Field>  
              <Form.Field >
                  <Form.Label htmlFor="password">
                    Senha
                  </Form.Label>
                  <Form.Input type="password" name="password" />
                  <Form.ErrorMessage field="password" />
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