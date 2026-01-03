
# Teste Técnico – Cadastro de Usuários

Este projeto é um teste técnico fullstack para cadastro e listagem de usuários.

---

## Stack utilizada

### Backend
- Node.js
- TypeScript
- Express
- Zod (validação)
- CORS

### Frontend
- React
- TypeScript
- Vite
- TailwindCSS

---

## Funcionalidades

### Backend
- Cadastro de usuários
- Persistência em memória
- Validação de dados com Zod
- Retorno de erros de validação
- Verificação de email duplicado

### Frontend
- Formulário de cadastro de usuários
- Listagem de usuários cadastrados
- Exibição de erros retornados pela API
- Feedback de loading e sucesso
- Layout responsivo

---

## Como rodar o projeto

### Pré-requisitos
- Node.js (instale pelo site oficial: https://nodejs.org)
- NPM (instalado junto com Node.js)

---

### 1 - Clonar o repositório

- Clone o repositório com `git clone [URL_REPOSITORIO]`
- Entre no repósitório com `cd [NOME_DO_REPOSITORIO]`

---

### 2 - Rodar o Backend

```
cd user-api
npm install
npm run dev
```

- `npm install` instalará as dependências.
- `npm run dev` irá rodar a API em http://localhost:3333

---

### 3 - Rodar o Frontend

```
cd user-frontend
npm install
npm run dev
```

- `npm install` instalará as dependências.
- `npm run dev` irá rodar a aplicação em http://localhost:5173

---

### 4 - Acessar a página web

Ao entrar em http://localhost:5173 a aplicação estará funcionando normalmente.

Aproveite para testar à vontade!
