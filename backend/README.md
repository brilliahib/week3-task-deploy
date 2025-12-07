# 🚀 Simple Forum Backend

Simple Forum Backend adalah REST API yang dibangun menggunakan teknologi modern untuk membuat platform forum sederhana dengan fitur Post, Comment, dan User Authentication.

Backend ini mendukung CRUD lengkap untuk Post & Comment, dengan struktur yang bersih dan dokumentasi API otomatis.

---

## 🧰 Tech Stack

| Technology            | Description                      |
| --------------------- | -------------------------------- |
| Elysia.js             | Fast web framework for Bun       |
| Prisma ORM            | Database ORM                     |
| PostgreSQL (Supabase) | Primary database                 |
| Swagger UI            | Auto-generated API documentation |
| Postman               | Additional API reference         |
| Bun                   | JavaScript runtime               |

---

## 📦 Getting Started

Install dependencies:
bun install

Copy environment file:
cp .env.example .env

Set your Supabase PostgreSQL credentials:
DATABASE_URL="postgresql://postgres:password@aws-region.supabase.co:5432/postgres"

---

## 🗄️ Prisma Setup

Generate Prisma Client:
bunx prisma generate

Run database migrations:
bunx prisma migrate dev

---

## 🚀 Development

Start development server:
bun run dev

API will be available at:
https://forum-backend-rho.vercel.app

---

## 🐳 Docker Setup

### Prerequisites

- Docker
- Docker Compose

### Build Docker Image

Build the Docker image:

```bash
docker build -t forum-backend .
```

### Running with Docker Compose

The project includes a `docker-compose.yml` file that sets up the entire environment with PostgreSQL database.

Start the application and database:

```bash
docker-compose up -d
```

This will:

- Start the PostgreSQL database on port 5432
- Start the backend server on port 3000
- Automatically run database migrations

Stop the containers:

```bash
docker-compose down
```

View logs:

```bash
docker-compose logs -f
```

### Running Docker Manually

Build the image:

```bash
docker build -t forum-backend .
```

Run the container:

```bash
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://postgres:password@localhost:5432/forum" \
  forum-backend
```

### Environment Variables for Docker

Make sure your `.env` file includes:

```
DATABASE_URL="postgresql://postgres:password@host.docker.internal:5432/forum"
PORT=3000
```

For Docker Compose, the DATABASE_URL should point to the database service name:

```
DATABASE_URL="postgresql://postgres:password@postgres:5432/forum"
```

---

## 📘 Swagger Documentation

Swagger UI dapat diakses melalui:
https://forum-backend-rho.vercel.app/docs

---

## 📚 Postman Documentation

Dokumentasi API Postman:
https://documenter.getpostman.com/view/36801373/2sB3dLUXMA

---

## 🛠️ Forum Features

### Users

- Register & login
- JWT authentication
- Relasi dengan Post & Comment

### Posts

- Create post
- Get all posts (pagination + search)
- Get post by ID
- Get posts by logged-in user
- Update post (author only)
- Delete post (author only)

### Comments

- Add comment to post
- Get comments by post ID
- Update comment (author only)
- Delete comment (author only)

---

## 📂 Folder Structure

    .
    ├── prisma/
    │   └── schema.prisma
    │
    ├── src/
    │   ├── middlewares/
    │   ├── modules/
    │   └── utils/
    │
    ├── .env
    ├── .env.example
    ├── package.json
    ├── tsconfig.json
    └── README.md

---

## 📝 Scripts

bun run dev - Start development server
bun run start - Start production server
bunx prisma migrate dev - Run migrations
bunx prisma studio - Open Prisma Studio

---

## 🧩 Prisma Schema Overview

### User

- id
- name
- email
- password
- posts
- comments

### Post

- id
- title
- content
- authorId
- comments[]
- createdAt
- updatedAt

### Comment

- id
- content
- postId
- authorId
- createdAt
- updatedAt

Relasi Forum:
User (1) —— (n) Post  
User (1) —— (n) Comment  
Post (1) —— (n) Comment

---

## ✨ Highlights

- Clean architecture (libs, routes, models, repositories)
- JWT-based authentication middleware
- CRUD lengkap untuk Post & Comment
- Prisma + Supabase integration
- Swagger auto documentation
