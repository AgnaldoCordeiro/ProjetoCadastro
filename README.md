# ProjetoCadastro

## Inicializando API

1 - Abra o projeto da api em um terminal - cd/api_cadastro 
2 - instale as dependencias - npm install
3 - rode o projeto - npm run dev
4 - voce pode consultar o banco de dados local em outro terminal aberto - npx prisma studio


## Inicializando aplicacao WEB

1 - Abra o projeto react em um terminal - cd/CadastroTedde 
2 - instale as dependencias - npm install
3 - rode o projeto - npm run dev
4 - Abra o navegador e acesse http://127.0.0.1:5173/

## Acesso
1 - Para ficar mais facil, na home tem 2 links de acesso colaborador e cliente.
2 - ao acessar o cliente ele solicita o cpf que ja esta no banco 99999999999 ao acessar ele ira refirecionar para a tela de cadastros /clientes/cadastro.
3 - ao acessar o colaborador ele solicita usuario e senha. user:Admin senha:5323896 ao acessar ele ira redirecionar para tela de dashboard /dashboard.

## PROBLEMAS!!!
esta sem segurança, um cliente poderia mudar a url e acessar dashboard e um colaborador poderia acessar a tela de cadastro do cliente.


