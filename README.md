# Box-money-api

O projeto foi feito utilizando o banco de dados postgres, Prisma, typescript, express
## Download e Configuração

Primeiro faça o download do projeto
```git clone https://github.com/leandross2/box-money-api.git ```

após a instalação entre na pasta do projeto e instale as dependencias
```cd box-money-api && yarn ```

após a instação faça a configuração do arquiv ```.env```
na raiz do projeto altere o nome do arquivo ```.env.example``` para ```.env``` e na variavel **DATABASE_URL** altere o valor para a url de conexão do seu banco de dados *(lembrando que projeto foi feito utilizando postgres)*
no arquivo ```.env``` também existe a variavel **APP_SECRET** que recebe uma string que vai ser utilizada para gerar o token JWT, pode colocar o texto que desejar nesta variavel

Após estas configurações, você pode rodar o comando ```yarn prisma:migrate``` para fazer a criação das tabelas em seu banco de dados

DICA: para visualizar seu banco de dados você pode executar o comando ```yarn prisma:studio``` que ira abrir um SGDB em seu browser na porta ```5555```

e finalmente pode executar o comando ```yarn start``` para executar o projeto.*(por padrão o projeto roda na porta 3333)*

as rotas do projeto estão no arquivo ```Insomnia_2021-11-08.json``` na raiz do projeto

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Box-money-api&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fleandross2%2Fbox-money-api%2Fmain%2FInsomnia_2021-11-08.json)

## Executando as rotas

As rotas autenticadas exigem que seja passado o header ```Authorizarion``` com um Bearer token em seu valor que é retornado da rota ```POST:/sessions```

#### Rotas não autendicadas
**Accounts**
POST:http://localhost:3333/accounts
- body {
	"name": string,
	"username": string
  }

**Sessions**
POST:http://localhost:3333/sessions
  - body {
	  "username": string
  }

#### Rotas Privadas

**Accounts**
GET:http://localhost:3333/accounts/me

**Transactions**
POST:http://localhost:3333/transactions
  - body{
    "type": "debit" | "credit",
    "description": string,
    "value": number,
    "account_id": string
  }

GET:http://localhost:3333/transactions


Qualquer duvida ou problema, estou a disposição

