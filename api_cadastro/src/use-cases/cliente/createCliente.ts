
import { AppError } from '../../errors/AppError';
import { ClienteRepository } from '../../repositories/cliente-repositories';



interface CreateClienteUseCaseRequest {
  cgc_pessoa: string;
}
 
export class CreateClienteUseCase{
  constructor(
    private clienteRepository: ClienteRepository,
  ) { }
  
  async execute(request: CreateClienteUseCaseRequest) {
    const { cgc_pessoa } = request;

    if (!cgc_pessoa) {
      throw new AppError('Usuario is required.')   } 
    
    const clienteAlreadyExists = await this.clienteRepository.findByCliente(cgc_pessoa)   
 
    if (clienteAlreadyExists) {
      throw new AppError('Cliente já already exists')
    }   

   
    await this.clienteRepository.create({
      cgc_pessoa
    })
  }
}