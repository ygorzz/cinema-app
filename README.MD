# Cinema API

## Descrição

API REST para gerenciamento de um catálogo de cinema, permitindo o cadastro e a consulta de **filmes** e **diretores**. O projeto foi desenvolvido como prática de estudo dos fundamentos de construção de APIs REST com Node.js, Express e MongoDB.

A API segue a arquitetura MVC (Model-View-Controller), com separação clara de responsabilidades entre modelos de dados, lógica de negócio e definição de rotas.

**A diferença do projeto dessa branch é o uso da Referência como abordagem para a modelagem dos dados entre as coleções filmes e diretores**.

---

## Tecnologias utilizadas

| Tecnologia | Versão | Função |
|---|---|---|
| [Node.js](https://nodejs.org/) | >= 18 | Plataforma de execução |
| [Express](https://expressjs.com/) | ^5.2.1 | Framework web para criação das rotas e middlewares |
| [Mongoose](https://mongoosejs.com/) | ^9.5.0 | Modelagem e comunicação com o MongoDB |
| [dotenv](https://github.com/motdotla/dotenv) | ^17.4.2 | Gerenciamento de variáveis de ambiente |
| [nodemon](https://nodemon.io/) | — | Reinicialização automática do servidor em desenvolvimento |
| [MongoDB Atlas](https://www.mongodb.com/atlas) | — | Banco de dados NoSQL em nuvem |

A aplicação utiliza **ES Modules** (`import`/`export`) nativamente.

---

## Estrutura do projeto

```
cinema-api/
├── src/
│   ├── config/
│   │   └── dbConnect.js          # Configuração e conexão com o MongoDB via Mongoose
│   ├── controllers/
│   │   ├── filmeController.js    # Lógica de negócio para filmes (CRUD)
│   │   └── diretorController.js  # Lógica de negócio para diretores (CRUD)
│   ├── models/
│   │   ├── Filmes.js             # Schema e model Mongoose para filmes
│   │   └── Diretor.js            # Schema e model Mongoose para diretores
│   ├── routes/
│   │   ├── index.js              # Centralizador de rotas da aplicação
│   │   ├── filmeRoutes.js        # Definição das rotas de filmes
│   │   └── diretorRoutes.js      # Definição das rotas de diretores
│   └── app.js                    # Instância e configuração do Express
├── server.js                     # Ponto de entrada: conecta ao BD e sobe o servidor
├── .env                          # Variáveis de ambiente (não versionado)
├── .gitignore
└── package.json
```

---

## Funcionalidades

### Filmes (`/filmes`)

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/filmes` | Lista todos os filmes cadastrados |
| `GET` | `/filmes?genero=<genero>` | Lista filmes filtrados por gênero |
| `GET` | `/filmes/:id` | Busca um filme pelo ID |
| `POST` | `/filmes` | Cadastra um novo filme |
| `PUT` | `/filmes/:id` | Atualiza os dados de um filme |
| `DELETE` | `/filmes/:id` | Remove um filme |

**Campos do filme:**

```json
{
  "titulo": "string (obrigatório)",
  "genero": "string",
  "anoLancamento": "number",
  "duracaoMinutos": "number",
  "diretor": "<id do diretor>"
}
```

> Ao cadastrar um filme, o ID do diretor é informado no campo `diretor`. A API busca o documento completo do diretor e o embute no registro do filme.

---

### Diretores (`/diretores`)

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/diretores` | Lista todos os diretores cadastrados |
| `GET` | `/diretores?nacionalidade=<pais>` | Lista diretores filtrados por nacionalidade |
| `GET` | `/diretores/:id` | Busca um diretor pelo ID |
| `POST` | `/diretores` | Cadastra um novo diretor |
| `PUT` | `/diretores/:id` | Atualiza os dados de um diretor |
| `DELETE` | `/diretores/:id` | Remove um diretor |

**Campos do diretor:**

```json
{
  "nome": "string (obrigatório)",
  "nacionalidade": "string"
}
```

---

## Aprendizados

Este projeto consolidou os seguintes conceitos e práticas:

- **Arquitetura MVC** — Separação de responsabilidades entre models, controllers e routes, tornando o código mais organizado, legível e manutenível.
- **Express Router** — Uso de `express.Router()` para modularizar as rotas e centralizar seu registro via um arquivo `index.js`.
- **Mongoose** — Definição de schemas tipados, uso de `model.find()`, `findById()`, `create()`, `findByIdAndUpdate()` e `findByIdAndDelete()`.
- **Referencing** — O schema de `Diretor` é referenciado pelo id dentro do schema de `Filme`, demonstrando a estratégia de referencing do MongoDB.
- **Variáveis de ambiente** — Uso do `dotenv` para separar configurações sensíveis (como a string de conexão ao banco) do código-fonte.
- **Padrão async/await** — Todas as operações de banco de dados são assíncronas, com tratamento de erros via `try/catch`.
- **Query parameters** — Implementação de filtros opcionais via `req.query` para busca por gênero e por nacionalidade.
- **ES Modules no Node.js** — Utilização de `import`/`export` em vez de `require`/`module.exports`.
- **Inicialização segura do servidor** — O servidor HTTP só é iniciado após a conexão bem-sucedida com o banco de dados.

---

## Como executar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- Uma instância do MongoDB (local ou [MongoDB Atlas](https://www.mongodb.com/atlas))

### Passo a passo

**1. Clone o repositório e acesse a pasta do projeto:**

```bash
git clone <url-do-repositorio>
cd cinema-api
```

**2. Instale as dependências:**

```bash
npm install
```

**3. Configure as variáveis de ambiente:**

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
DB_CONNECTION_STRING=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/<nome-do-banco>
```

> Substitua os valores pelos dados da sua instância do MongoDB.

**4. Inicie o servidor em modo de desenvolvimento:**

```bash
npm run dev
```

O servidor será iniciado na porta `3000`. Após a conexão com o banco ser estabelecida, a seguinte mensagem será exibida no terminal:

```
Conexão com o BD feita com sucesso
Servidor rodando e aguardando requisição
```

**5. Teste os endpoints:**

Utilize uma ferramenta como [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/) para interagir com a API em `http://localhost:3000`.

---

## Licença

Este projeto está sob a licença [MIT](https://opensource.org/licenses/MIT).
