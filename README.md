# ProjetoCadastro

O projeto consiste em permitir que um colaborador cadastre o CPF/CNPJ do cliente no sistema, de forma que o cliente possa acessá-lo posteriormente e preencher seus dados. Esses dados são enviados com status "pendente" e o colaborador, após análise, pode atualizar o status para "Aprovado", "Reprovado" ou "Cancelado", caso haja desistência.

Caso seja aprovado, os dados são enviados para um sistema de terceiros que é cadastrado e utilizado pelo mesmo.

### Iniciando a API

Abra o projeto da API em um terminal: cd/api_cadastro
Instale as dependências: npm install
Rode o projeto: npm run dev
Você pode consultar o banco de dados local em outro terminal aberto: npx prisma studio

### Iniciando a aplicação web

Abra o projeto React em um terminal: cd/CadastroTedde
Instale as dependências: npm install
Rode o projeto: npm run dev
Abra o navegador e acesse http://127.0.0.1:5173/

### Acesso

Para facilitar, na home tem 2 links de acesso: "colaborador" e "cliente".
Ao acessar o cliente, será solicitado o CPF, que já está cadastrado no banco como "99999999999". Após o acesso, o cliente será redirecionado para a tela de cadastro: /clientes/cadastro.
Ao acessar o colaborador, será solicitado o usuário e a senha. User: "Admin" e senha: "5323896". Após o acesso, o colaborador será redirecionado para a tela de dashboard: /dashboard.

