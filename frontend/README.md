# ACME Dashboard - Next.js Learning Project

A modern dashboard application built with Next.js 16, React, TypeScript, Tailwind CSS, and PostgreSQL. Features invoice and customer management with authentication.

## Quick Start

### Prerequisites

- **Node.js** v18+ (download from https://nodejs.org)
- **pnpm** v8+ (install with `npm install -g pnpm`)
- **Docker** (optional, for containerized setup)
- **PostgreSQL** 14+ (or use Docker)

### Installation

1. **Install dependencies:**

```bash
pnpm install
```

2. **Setup environment variables** - Create `.env.local`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/acme_dashboard"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

Generate NEXTAUTH_SECRET:

```bash
openssl rand -base64 32
```

3. **Seed database (optional):**

```bash
curl http://localhost:3000/api/seed
```

### Running the Application

**Development Mode:**

```bash
pnpm run dev
```

Visit `http://localhost:3000`

**Production Build:**

```bash
pnpm run build
pnpm run start
```

**Linting:**

```bash
pnpm run lint
```

---

## Docker Setup

### Build and Run

**Build Docker image:**

```bash
docker build -t acme-dashboard:latest .
```

**Run container:**

```bash
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://user:pass@localhost:5432/acme" \
  -e NEXTAUTH_SECRET="your-secret" \
  acme-dashboard:latest
```

**Run in background:**

```bash
docker run -d -p 3000:3000 --name acme \
  -e DATABASE_URL="postgresql://user:pass@localhost:5432/acme" \
  -e NEXTAUTH_SECRET="your-secret" \
  acme-dashboard:latest
```

**View logs:**

```bash
docker logs -f acme
```

**Stop container:**

```bash
docker stop acme
```

---

## Project Structure

```
app/
├── dashboard/           # Dashboard pages
│   ├── (overview)/     # Overview page
│   ├── customers/      # Customer management
│   └── invoices/       # Invoice management
├── login/              # Login page
├── lib/                # Utilities & actions
│   ├── actions.ts      # Server actions
│   ├── data.ts         # Data fetching
│   └── definitions.ts  # Type definitions
└── ui/                 # React components
```

## Default Login Credentials

- **Email:** `user@nextmail.com`
- **Password:** `123456`

## Features

- Dashboard with analytics and statistics
- Customer management with search
- Invoice creation, editing, and deletion
- User authentication with NextAuth
- Responsive design with Tailwind CSS
- Type-safe with TypeScript

## Tech Stack

- **Frontend:** Next.js 16, React, TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL
- **Authentication:** NextAuth v5
- **Package Manager:** pnpm
- **Containerization:** Docker

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Docker Documentation](https://docs.docker.com/)
- [Tailwind CSS](https://tailwindcss.com/)
