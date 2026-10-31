# FC Clean Architecture

Projeto de Clean Architecture implementando entidades de **Customer** e **Product** com API REST, testes unitários, testes de integração e testes e2e.

## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- npm (v6 ou superior)

## 🚀 Instruções de Uso

### 1. Instalar dependências

```bash
npm install
```

### 2. Rodar a API em desenvolvimento

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`

### 3. Rodar os testes

```bash
npm run test
```

Executa todos os testes (unitários, integração e e2e) com verificação de tipos TypeScript.

## 📁 Estrutura do Projeto

```
src/
├── domain/              # Entities, interfaces, value objects e business rules
│   ├── customer/
│   └── product/
├── usecase/             # Use cases da aplicação
│   ├── customer/
│   │   ├── create/
│   │   ├── list/
│   │   ├── find/
│   │   └── update/
│   └── product/
│       ├── create/
│       ├── list/
│       ├── find/
│       └── update/
└── infrastructure/      # Implementações técnicas
    ├── api/
    │   ├── routes/      # Rotas Express
    │   ├── presenters/  # Formatadores de resposta (XML, JSON)
    │   └── __tests__/   # Testes e2e
    ├── customer/        # Repository do Customer (Sequelize)
    └── product/         # Repository do Product (Sequelize)
```

## 🔌 Endpoints

### Customer

- **POST** `/customer` - Criar cliente
- **GET** `/customer` - Listar clientes (suporta JSON e XML)

### Product

- **POST** `/product` - Criar produto
- **GET** `/product` - Listar produtos (suporta JSON e XML)

## 🧪 Testes

O projeto possui testes em diferentes níveis:

- **Testes Unitários**: Validam lógica das use cases
- **Testes de Integração**: Validam interação com repositórios
- **Testes E2E**: Validam fluxo completo das rotas HTTP

Todos rodam com:

```bash
npm run test
```

## 💾 Banco de Dados

O projeto usa SQLite em memória para testes e desenvolvimento local.

## 📝 Exemplo de Uso

### Criar um Produto

```bash
curl -X POST http://localhost:3000/product \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Notebook",
    "price": 2500.00
  }'
```

### Listar Produtos (JSON)

```bash
curl http://localhost:3000/product \
  -H "Accept: application/json"
```

### Listar Produtos (XML)

```bash
curl http://localhost:3000/product \
  -H "Accept: application/xml"
```
