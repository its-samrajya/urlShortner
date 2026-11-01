# ZipMyURL

A full-stack URL shortener that converts long URLs into short, shareable links with automatic redirection.

## Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Express.js, Node.js
- **Database:** MongoDB
- **Containerization:** Docker, Docker Compose

## Getting Started with Docker

### Prerequisites

- Git
- Docker with Docker Compose

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd shortlink
```

### 2. Configure environment variables

Create a `backend/.env` file:

```env
PORT=8000
CORS_URL=http://localhost:3000
```

No MongoDB Atlas account is required. MongoDB runs locally through Docker Compose.

### 3. Start the application

```bash
docker compose up --build -d
```

### 4. Open the application

Visit [http://localhost:3000](http://localhost:3000).

## Database

MongoDB runs in its own Docker container. Database data is persisted using a Docker named volume, so it remains available when containers are stopped or recreated.

To stop the application:

```bash
docker compose down
```

To stop the application and delete the local database data:

```bash
docker compose down -v
```

---

**Live Demo:** https://zipmyurl.vercel.app
