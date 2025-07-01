
# 📦 AppDayana · Fullstack Project

Fullstack application with a backend built on Node.js + Express + Prisma ORM, a modern frontend using Vite + React, and a containerized architecture powered by Docker and Docker Compose.

## 🌍 Overview

This project offers:

- 📥 Task creation and management (todo-list)
- 🧠 Backend with Prisma + Express
- 🎨 Frontend with React + Vite
- 🐳 Isolated development environments with Docker
- 🛠️ Ready-to-use scripts for local development

---

## 📁 Project Structure

```
/
├── backEndAppDayana/
│   ├── src/
│   ├── prisma/
│   └── Dockerfile
├── frontAppDaya/
│   ├── src/
│   └── Dockerfile
├── docker-compose.yml
```

---

## 🚀 Getting Started with Docker

1. Clone this repository:

```bash
git clone https://github.com/your-username/AppDayana-Fullstack.git
cd AppDayana-Fullstack
```

2. Start all services:

```bash
docker compose up --build
```

3. Access:

- Backend: [http://localhost:3000](http://localhost:3000)
- Frontend: [http://localhost:5173](http://localhost:5173)

---

## 🛠️ Core Features

- Full task CRUD (Create, Read, Update, Delete)
- Tasks sorted by due date
- Toggle completion status
- Fully integrated frontend and backend
- Database interaction via Prisma ORM

---

## ⚙️ Tech Stack

| Backend           | Frontend       | DevOps           |
|------------------|----------------|------------------|
| Node.js / Express| React + Vite   | Docker / Compose |
| Prisma ORM       | Axios / CSS    | Nodemon          |
| SQLite or PostgreSQL (optional) |  | Hot reload       |

---

## 📄 Useful Commands

Inside the `backEndAppDayana` folder:

```bash
# Generate Prisma Client manually
npx prisma generate

# Run backend locally (without Docker)
npm run dev
```

---

## 📬 Contributing

Contributions are welcome! Feel free to open an issue, create a pull request, or share your ideas 🙌

---

## 🧑‍💻 Author

Made with 💙 by [Dayana](https://github.com/DayanaAra23)

