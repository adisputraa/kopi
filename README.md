# 🚀 API Starter Project

**API Starter Project** – A clean and scalable starter template for building RESTful APIs with **TypeScript**, **Express**, **Prisma**, and **Jest**.  
Includes environment configuration, modular code structure, testing setup, and email support via **Nodemailer**.  
Perfect for quickly bootstrapping a **production-ready API** with best practices.

---

## ✅ Requirements

Before running this project, make sure you have installed the following:

- **[Node.js](https://nodejs.org/)** v18 or higher
- **[npm](https://www.npmjs.com/)** (comes with Node.js)
- **[PostgreSQL](https://www.postgresql.org/)** (or another supported database, adjust `DATABASE_URL` accordingly)
- **[Git](https://git-scm.com/)** (for cloning the repository)
- **OpenSSL** (for generating secure JWT/email secrets, optional but recommended)

Optional (for development convenience):

- **[Docker](https://www.docker.com/)** (if you prefer running PostgreSQL in a container)
- **[npx npm-check-updates](https://www.npmjs.com/package/npm-check-updates)** for dependency updates

---

## 📂 Folder Structure

```
.
├── __test__            # Unit & integration tests
│   ├── integration/    # Integration tests
│   └── unit/           # Unit tests
├── docs/               # API documentation (OpenAPI/Swagger)
├── prisma/             # Prisma schema & migrations
├── src/                # Main source code
│   ├── configs/        # Configuration files (e.g., nodemailer, prisma client)
│   ├── controllers/    # Controllers for handling requests/responses
│   ├── middlewares/    # Custom middlewares (logger, validator, etc.)
│   ├── repositories/   # Database queries (via Prisma)
│   ├── routes/         # API routes
│   ├── schemas/        # Validation schemas (e.g., zod/joi)
│   ├── services/       # Business logic / service layer
│   └── utils/          # Utilities/helpers (error handler, logger, http status)
├── .env                # Environment variables
├── jest.config.js      # Jest testing configuration
├── package.json        # Dependencies & scripts
├── tsconfig.json       # Typescript configuration
└── README.md           # Project documentation
```

---

## ⚙️ Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/username/repo-name.git
   cd repo-name
   ```

2. Update dependencies to the latest version:

   ```bash
   npx npm-check-updates -u
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Setup environment variables:

   ```bash
   cp .env.example .env
   ```

   Example:

   ```env
   NODE_ENV=development

   PORT=4000

   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/dbname?schema=public"

   # Secrets
   SECRET_EMAIL_VERIFICATION=your_email_verification_secret
   SECRET_JWT_TOKEN=your_jwt_secret_key

   # Mailer (Nodemailer)
   EMAIL_SERVICE=gmail
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=465
   EMAIL_SECURE=true
   EMAIL_AUTH_EMAIL=youremail@gmail.com
   EMAIL_AUTH_PASSWORD=your_email_password
   ```

---

## 🛠 Prisma Commands

Prisma is used for database management. Common commands include:

- Initialize Prisma:

  ```bash
  npx prisma init
  ```

- Generate Prisma client:

  ```bash
  npx prisma generate
  ```

- Push schema changes to the database (without migrations):

  ```bash
  npx prisma db push
  ```

- Create and run a new migration:

  ```bash
  npx prisma migrate dev
  ```

- Apply migrations in production:

  ```bash
  npx prisma migrate deploy
  ```

- Open Prisma Studio (GUI for database):
  ```bash
  npx prisma studio
  ```

---

## 🚀 Running the Project

Run in **development mode** with auto-reload:

```bash
npm run dev
```

Run tests:

```bash
npm run test
```

Build the project (transpile TypeScript to JavaScript):

```bash
npm run build
```

Run in **production mode**:

```bash
npm start
```

---

## 📖 API Documentation

- OpenAPI/Swagger specs can be found in the `docs/` folder.
- Can be integrated with Swagger UI or Redoc.

---

## 🔑 Starter Features

This starter already includes several essential features to speed up development:

- ✅ **Express + TypeScript** → Strongly typed API server
- ✅ **Prisma ORM** → Safer & easier database queries
- ✅ **Controller-Service-Repository Pattern** → Modular & scalable structure
- ✅ **Middlewares** → Logger, validator (zod/joi), notFound handler, error handler
- ✅ **Utils** → Error handler (ApiError), HTTP status helper, request context, logger
- ✅ **Testing setup (Jest)** → Ready-to-use Unit & Integration testing
- ✅ **Environment Config** → Supports `.env`, `.env.test`, `.env.production`
- ✅ **Swagger/OpenAPI Ready** → API documentation can be expanded easily
- ✅ **Nodemailer Integration** → Ready-to-use email service for verification/notifications
