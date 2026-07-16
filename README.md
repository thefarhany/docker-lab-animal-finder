# 🐾 Animal Finder

A simple full-stack animal catalog built with **Next.js**, **Node.js**, **Express**, and **MySQL**.

## 📁 Project Structure

```
animal-finder/
├── backend/           # Node.js + Express + MySQL API
│   ├── src/
│   │   ├── db.js      # MySQL connection pool
│   │   ├── index.js   # Express server entry
│   │   ├── routes/
│   │   │   └── animals.js   # /api/animals routes
│   │   └── seed.js    # Database seeder
│   ├── .env.example
│   └── package.json
└── frontend/          # Next.js app
    ├── app/
    │   ├── page.tsx
    │   ├── animal/[id]/page.tsx
    │   └── components/
    ├── lib/api.ts
    └── .env.example
```

## ⚙️ Setup

### 1. Database (MySQL)

Make sure MySQL is running, then create a database:

```sql
CREATE DATABASE animal_finder;
```

Copy backend environment file and adjust the values:

```bash
cd backend
cp .env.example .env
```

Edit `.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=animal_finder
PORT=5000
```

### 2. Backend

Install dependencies and seed the database:

```bash
cd backend
npm install
npm run seed
npm run dev
```

Backend will run at `http://localhost:5000`.

### 3. Frontend

Copy frontend environment file:

```bash
cd frontend
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Run the dev server:

```bash
npm run dev
```

Frontend will run at `http://localhost:3000`.

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/animals?search={q}&category={id}` | List/search animals |
| GET | `/api/animals/:id` | Get animal detail |
| GET | `/api/categories` | List categories |

## 🌱 Seeder

The seeder creates two tables:

- `categories` — Mammal, Bird, Reptile, Fish, Amphibian
- `animals` — 10 sample animals with images from Unsplash

Run it anytime to reset the data:

```bash
cd backend
npm run seed
```
