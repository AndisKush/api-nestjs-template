<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo"/>
</p>

<h1 align="center">🚀 API RESTful - NestJS Template</h1>

<p align="center">
  <b>API em construção, desenvolvida para ser um modelo de referência com as melhores práticas para aplicações RESTful usando NestJS.</b>
</p>

<p align="center">
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://img.shields.io/badge/NestJS-Framework-E0234E?style=for-the-badge&logo=nestjs&logoColor=white"/>
  </a>
  <img src="https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Arquitetura-Limpa-success?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-orange?style=for-the-badge"/>
</p>

---

## 📖 Sobre o Projeto

Este projeto foi criado para ser **uma base sólida para qualquer API RESTful**, trazendo:

✅ **Arquitetura limpa e organizada**  
✅ **Boas práticas de SOLID e Clean Code**  
✅ **DTOs com validação automática (class-validator & class-transformer)**  
✅ **Prisma ORM para acesso ao banco de dados**  
✅ **Padronização de respostas e erros**  
✅ **Suporte a testes (unitários e e2e)**  
✅ **Documentação automática com Swagger**

---

## 🛠️ Tecnologias Utilizadas

- [NestJS](https://nestjs.com) - Framework Node.js para aplicações escaláveis
- [TypeScript](https://www.typescriptlang.org/) - Tipagem estática
- [Prisma](https://www.prisma.io/) - ORM moderno e performático
- [Class-Validator](https://github.com/typestack/class-validator) - Validação de dados
- [Class-Transformer](https://github.com/typestack/class-transformer) - Transformação de objetos
- [Swagger](https://swagger.io/) - Documentação da API
- [Jest](https://jestjs.io/) - Testes unitários e de integração

---

## 🚀 Como Rodar o Projeto

```bash
# 1️⃣ Instale as dependências
npm install

# 2️⃣ Suba o banco de dados (caso use docker) ou instale localmente e crie seu .env
docker-compose up -d

# 3️⃣ Rode as migrations do Prisma
npx prisma migrate dev

# 4️⃣ Inicie o servidor em modo desenvolvimento
npm run start:dev
```
