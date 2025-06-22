# 📚 Book Management API

A simple RESTful API built with **Node.js**, **Express**, **MongoDB**, **Mongoose** and **Zod** for managing books and borrowing records.

---

## 🔧 Features

- ✅ Create, Read, Update, Delete books
- ✅ Filter books by genre
- ✅ Sort and limit query results
- ✅ Borrow books with inventory checks
- ✅ Aggregate borrowed book summaries
- ✅ Global error handling
- ✅ Schema validation using Zod

---

## 📁 Folder Structure

```
src/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── schemas/
├── utils/
└── app.ts
```

---

## 🚀 API Endpoints

### 📘 Books

| Method | Endpoint              | Description               |
|--------|------------------------|---------------------------|
| GET    | `/api/books`          | Get all books (filter, sort, limit) |
| GET    | `/api/books/:bookId`  | Get a single book         |
| POST   | `/api/books`          | Create a new book         |
| PUT    | `/api/books/:bookId`  | Update a book             |
| DELETE | `/api/books/:bookId`  | Delete a book             |

**Example:**  
`GET /api/books?filter=FICTION&sortBy=createdAt&sort=desc&limit=5`

---

### 📗 Borrow

| Method | Endpoint         | Description                    |
|--------|------------------|--------------------------------|
| POST   | `/api/borrow`    | Borrow a book (deducts copies) |
| GET    | `/api/borrow`    | Get borrowed summary (aggregate) |

---

## 🛡️ Validation

All inputs are validated using **Zod schema**. On validation error, a structured response is returned:

```json
{
  "success": false,
  "message": "Validation error",
  "error": {
    "copies": { "_errors": ["Copies must be a positive number"] }
  }
}
```

---

## 🧪 Error Handling

Errors are caught and formatted using a global error handler middleware, ensuring consistent response structure.

---

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Sarajit-mondal/assignment-3-Library-Management-API.git
cd book-management-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root directory:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_uri
```

---

## ▶️ Running the Project

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm run build
npm start
```

## 📤 Deploy to Vercel

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Build your project

```bash
npm run build
```

### 3. Deploy

```bash
vercel
```

### 4. Configure `vercel.json`

```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/server.js"
    }
  ]
}

```

---


## 📚 License

## 👨‍💻 Author

Made with ❤️ by Sarajit Mondal

This project is open-source and free to use.

