export type CreateSessionDTO = {
  users: string;
  password: string;
}
export type CreateSessionClienteDTO = {
  cgc_pessoa: string;
}

export type DecodedToken = {
  sub: string;
}

export type Role = "ADMIN" | "USER";
export type Status = "Aprovado" | "Cancelado" | "Reprovado" | "Pendente";
