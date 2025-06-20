# TypeScript Express MongoDB Starter

A boilerplate for building REST APIs using:

- TypeScript
- Express.js
- MongoDB with Mongoose
- dotenv
- Zod for validation
- ts-node-dev for development
- ESLint

---

## 🛠️ Installation

```bash
git clone https://github.com/yourusername/ts-express-api.git
cd ts-express-api
npm install
```

---

## 🔧 Configuration

Create a `.env` file in the root:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ts-api
```

---

## 🚀 Run Project

### Start development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Start production server

```bash
npm run start
```

### Run linter

```bash
npm run lint
```

---

## 📦 Folder Structure

```
ts-express-api/
├── src/
│   └── index.ts
├── .env
├── .eslintrc.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## ✨ Features

- Express API with TypeScript
- Mongoose ODM for MongoDB
- Zod for runtime validation
- ESLint with TypeScript support
- Hot reload using ts-node-dev

---

## 📄 Scripts in `package.json`

```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js",
  "lint": "eslint . --ext .ts"
}
```

---

## 📜 License

MIT