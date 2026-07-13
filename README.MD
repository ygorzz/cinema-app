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

### Infraestrutura e Deploy

- **Docker** — Containerização completa do front-end, back-end e infraestrutura.
- **Docker Compose** — Orquestração dos serviços da aplicação.
- **Nginx** — Servidor web para o front-end React e Reverse Proxy para a API.
- **Proxy Reverso** — Encaminhamento transparente das requisições `/api` para o back-end.
- **Controle de Cache** — Configuração do Nginx para evitar cache do `index.html`, garantindo atualização imediata após novos deploys.

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

- [Docker](https://www.docker.com/) 20 ou superior
- [Docker Compose](https://docs.docker.com/compose/) (ou Docker Compose V2)
- Uma instância do [MongoDB Atlas](https://www.mongodb.com/atlas) (ou outro banco MongoDB compatível)

### Passo a passo

**1. Clone o repositório e acesse a pasta do projeto:**

```bash
git clone <url-do-repositorio>
cd cinema-app
```

**2. Configure as variáveis de ambiente do back-end:**

Crie um arquivo `.env` dentro da pasta `backend` contendo:

```env
DB_CONNECTION_STRING=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/<nome-do-banco>
```

> Substitua os valores pelos dados da sua instância do MongoDB.

---

**3. Suba toda a aplicação utilizando o Docker Compose:**

```bash
docker compose up -d
```

O Docker Compose irá iniciar todos os serviços da aplicação automaticamente.

---

**4. Acesse a aplicação**

Após a inicialização dos containers, a aplicação estará disponível em:

| Serviço | Endereço |
|---|---|
| Front-end | `http://localhost` |
| API | `http://localhost/api` |

O front-end é servido pelo **Nginx**, que também atua como **Reverse Proxy**, encaminhando automaticamente todas as requisições iniciadas por `/api` para o back-end.

---

**5. Encerrar a aplicação**

Para parar todos os containers:

```bash
docker compose down
```

Caso queira remover também os volumes criados:

```bash
docker compose down -v
```

---

Desenvolvido por Ygor Santos — LinkedIn | GitHub
