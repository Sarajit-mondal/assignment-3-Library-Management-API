# 📚 Book Management API

A simple RESTful API built with **Node.js**, **Express**, **MongoDB**, and **Zod** for managing books and borrowing records.

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

## 📦 Installation

```bash
git clone https://github.com/Sarajit-mondal/assignment-3-Library-Management-API.git
cd book-management-api
npm install
npm run dev
```

---

## 📝 License

This project is open-source and free to use.

