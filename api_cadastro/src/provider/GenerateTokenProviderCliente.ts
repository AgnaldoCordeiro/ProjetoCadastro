import { sign } from "jsonwebtoken";
import { auth } from "../config/config";

class GenerateTokenProviderCliente{
  async execute(cliente_id: string){
    const token = sign({}, auth.secret,{
      subject: cliente_id,
      expiresIn: 60*30, // 30 minutes
 
    });

    return token;
  }
}
export {GenerateTokenProviderCliente}