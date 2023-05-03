import { PlusCircle } from "lucide-react"

export const TelaDeHome: React.FC = () => {

    return(
<div className="h-screen flex flex-col bg-zinc-900">
      <div className="flex flex-1 justify-center items-center">
        <main className="flex-2 justify-center">
          <h1 className="flex justify-center text-2xl font-bold text-emerald-500">Sistema de Cadastro de Locatário</h1>
          <img
            src={'/Logo.png'}
            alt="logo TeddeWork"
            width={400}
            height={400}
            className="p-10 "
          />

          <a
          href="/cliente"    
            className="text-emerald-500 font-semibold text-x1 flex items-center gap-1 "
          >
             
            Area do Cliente
            <PlusCircle size={24} />
          </a>

          <a
          href="/colaborador"    
            className="text-emerald-500 font-semibold text-x1 flex items-center gap-1 "
          >
             
            Area do Colaborador
            <PlusCircle size={24} />
          </a>


        </main>
      </div>
      <footer className="text-zinc-200 bg-zinc-800 border-t-zinc-700 p-2 flex justify-center">footer</footer>
    </div>
    )
}