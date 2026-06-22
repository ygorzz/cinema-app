# Cinema App

## Descrição

Projeto fullstack para gerenciamento de um catálogo de cinema, permitindo o cadastro e a consulta de **filmes** e **diretores**. O projeto foi desenvolvido como prática de estudo dos fundamentos de construção de APIs REST com Node.js, Express e MongoDB, e consumo dessa API com React.

O **back-end** segue a arquitetura MVC (Model-View-Controller), com separação clara de responsabilidades entre modelos de dados, lógica de negócio e definição de rotas. O **front-end** foi desenvolvido com React e Vite, com foco em consumo da API e prática dos fundamentos do React.

---

## Tecnologias utilizadas

### Back-end

| Tecnologia | Versão | Função |
|---|---|---|
| [Node.js](https://nodejs.org/) | >= 18 | Plataforma de execução |
| [Express](https://expressjs.com/) | ^5.2.1 | Framework web para criação das rotas e middlewares |
| [Mongoose](https://mongoosejs.com/) | ^9.5.0 | Modelagem e comunicação com o MongoDB |
| [dotenv](https://github.com/motdotla/dotenv) | ^17.4.2 | Gerenciamento de variáveis de ambiente |
| [nodemon](https://nodemon.io/) | — | Reinicialização automática do servidor em desenvolvimento |
| [MongoDB Atlas](https://www.mongodb.com/atlas) | — | Banco de dados NoSQL em nuvem |

### Front-end

| Tecnologia | Versão | Função |
|---|---|---|
| [React](https://react.dev/) | — | Biblioteca para construção da interface |
| [Vite](https://vitejs.dev/) | — | Ferramenta de build e servidor de desenvolvimento |
| [Axios](https://axiosjs.dev/) | — | Biblioteca para requisições ao servdor |

---

## Estrutura do projeto
 
```
├── backend/
│   ├── src/
│   │   ├── config/                   # Conexão com o banco e validações globais
│   │   ├── controllers/              # Recebe requisições e delega para os services
│   │   ├── errors/                   # Classes de erros customizados
│   │   ├── helpers/                  # Funções auxiliares reutilizáveis
│   │   ├── middlewares/              # Middlewares de erro, 404 e paginação
│   │   ├── models/                   # Schemas e models do Mongoose
│   │   ├── repositories/             # Acesso ao banco de dados
│   │   ├── routes/                   # Definição e centralização das rotas
│   │   ├── services/                 # Lógica de negócio
│   │   └── app.js                    # Instância e configuração do Express
│   ├── .env                          # Variáveis de ambiente (não versionado)
│   ├── eslint.config.js              # Configuração do ESLint
│   ├── package.json
│   ├── package-lock.json
│   └── server.js                     # Ponto de entrada: conecta ao BD e sobe o servidor
│
└── frontend/
    └── src/
        ├── components/               # Componentes reutilizáveis React
        ├── helpers/                  # Funções auxiliares do front-end
        ├── routes/                   # Definição de rotas do front-end
        ├── services/                 # Funções para comunicação com a API
        ├── index.css                 # Estilos globais
        └── main.jsx                  # Ponto de entrada da aplicação React
    ├── eslint.config.js              # Configuração do ESLint
    ├── index.html                    # HTML base da aplicação
    ├── package.json
    ├── package-lock.json
    └── vite.config.js                # Configuração do Vite
```

---

## Funcionalidades

### Filmes (`/filmes`)

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/filmes` | Lista todos os filmes cadastrados (suporta filtros, paginação e ordenação) |
| `GET` | `/filmes?genero=<genero>&titulo=<titulo>&diretor=<nome>&anoLancamento=<ano>` | Lista filmes filtrados por gênero, título, diretor ou ano |
| `GET` | `/filmes/:id` | Busca um filme pelo ID |
| `POST` | `/filmes` | Cadastra um novo filme |
| `PUT` | `/filmes/:id` | Atualiza os dados de um filme |
| `DELETE` | `/filmes/:id` | Remove um filme |

**Paginação e ordenação:**

- Query params: `pagina`, `limite`, `ordenacao` (ex: `/filmes?pagina=2&limite=5&ordenacao=titulo:1`)
- Ordenação: campo e ordem (1 = crescente, -1 = decrescente)

**Campos do filme:**

```json
{
  "titulo": "string (obrigatório)",
  "genero": "string",
  "anoLancamento": "number",
  "duracaoMinutos": "number (80 a 180)",
  "diretor": "<id do diretor> (obrigatório)"
}
```

> Ao cadastrar ou atualizar um filme, informe o ID do diretor. O documento do diretor será embutido no registro do filme.

---

### Diretores (`/diretores`)

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/diretores` | Lista todos os diretores cadastrados (suporta filtros, paginação e ordenação) |
| `GET` | `/diretores?nome=<nome>&nacionalidade=<pais>` | Lista diretores filtrados por nome ou nacionalidade |
| `GET` | `/diretores/:id` | Busca um diretor pelo ID |
| `POST` | `/diretores` | Cadastra um novo diretor |
| `PUT` | `/diretores/:id` | Atualiza os dados de um diretor |
| `DELETE` | `/diretores/:id` | Remove um diretor |

**Paginação e ordenação:**

- Query params: `pagina`, `limite`, `ordenacao` (ex: `/diretores?pagina=1&limite=10&ordenacao=nome:1`)

**Campos do diretor:**

```json
{
  "nome": "string (obrigatório)",
  "nacionalidade": "string"
}
```

---

## Funcionalidades e diferenciais

### Back-end

- **Arquitetura MVC** — Separação clara entre models, controllers, rotas e middlewares.
- **Express Router** — Modularização das rotas e centralização via arquivo index.js.
- **Mongoose** — Schemas tipados, validações customizadas, uso de métodos como `find`, `findById`, `create`, `findByIdAndUpdate`, `findByIdAndDelete`.
- **Relacionamento embutido** — O schema de Diretor é embutido no schema de Filme.
- **Validações globais** — Campos string não podem ser enviados em branco (validação global do Mongoose).
- **Paginação e ordenação** — Todas as rotas de listagem suportam paginação (`pagina`, `limite`) e ordenação (`ordenacao`).
- **Filtros flexíveis** — Filmes podem ser filtrados por gênero, título, diretor e ano; diretores por nome e nacionalidade.
- **Tratamento global de erros** — Middlewares para erros 404, validação, requisições incorretas e erros inesperados.
- **Helpers reutilizáveis** — Funções para padronizar respostas, sanitizar entradas e validar limites/páginas.
- **Variáveis de ambiente** — Uso do dotenv para separar configurações sensíveis.
- **ES Modules** — Utilização de `import`/`export` nativamente.
- **Linting** — Projeto configurado com ESLint para padronização de código.

### Front-end

- **React** — Construção da interface com componentes funcionais.
- **Vite** — Build e servidor de desenvolvimento rápido.
- **Consumo de API** — Comunicação com o back-end via camada de serviços dedicada (`services/`).
- **Componentização** — Interface dividida em componentes reutilizáveis.
- **Roteamento** — Navegação entre páginas gerenciada pela camada de rotas (`routes/`).

---

## Como executar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- Uma instância do MongoDB (local ou [MongoDB Atlas](https://www.mongodb.com/atlas))

### Back-end

**1. Clone o repositório e acesse a pasta do back-end:**

```bash
git clone <url-do-repositorio>
cd cinema-app/backend
```

**2. Instale as dependências:**

```bash
npm install
```

**3. Configure as variáveis de ambiente:**

Crie um arquivo `.env` na raiz da pasta `backend` com o seguinte conteúdo:

```env
DB_CONNECTION_STRING=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/<nome-do-banco>
```

> Substitua os valores pelos dados da sua instância do MongoDB.

**4. Inicie o servidor em modo de desenvolvimento:**

```bash
npm run dev
```

O servidor será iniciado na porta `3000`. Após a conexão com o banco ser estabelecida, as mensagens abaixo serão exibidas no terminal:

```
Conexão com o BD feita com sucesso
Servidor rodando e aguardando requisição
```

**5. Teste os endpoints:**

Utilize uma ferramenta como [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/) para interagir com a API em `http://localhost:3000`.

---

### Front-end

**1. Em outro terminal, acesse a pasta do front-end:**

```bash
cd cinema-app/frontend
```

**2. Instale as dependências:**

```bash
npm install
```

**3. Inicie o servidor de desenvolvimento:**

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` (porta padrão do Vite).

> Certifique-se de que o servidor do back-end está rodando antes de iniciar o front-end.

---
