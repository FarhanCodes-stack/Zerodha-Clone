# 📈 Zerodha Clone

A full-stack stock trading platform built with the **MERN stack**, inspired by [Zerodha](https://zerodha.com). Features JWT authentication, real-time portfolio tracking, and a multi-app architecture.

---

## ✨ Features

- **User Authentication** — Signup, Login, Logout with JWT tokens and bcrypt password hashing
- **Buy & Sell Orders** — Place market orders with real-time holdings updates
- **User-Specific Portfolio** — Each user sees only their own holdings, orders, and positions
- **Dynamic Dashboard** — Live P&L calculation, investment tracking, and holdings summary
- **Multi-App Architecture** — Separate Frontend (landing pages) and Dashboard (trading app)
- **Protected Routes** — Token-based route guarding with automatic redirect

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React, React Router, Axios |
| **Dashboard** | React, React Router, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Auth** | JWT, bcrypt |
| **Build Tool** | Vite |

---

## 📁 Folder Structure

```
Zerodha Clone/
├── Frontend/          → Landing pages (Signup, Login, Home, About, Pricing)
│   └── src/
│       └── landing_page/
│           ├── login/
│           ├── signup/
│           ├── home/
│           ├── about/
│           ├── products/
│           ├── pricing/
│           └── support/
│
├── Dashboard/         → Main trading app (requires authentication)
│   └── src/
│       ├── components/
│       │   ├── Holdings.jsx
│       │   ├── Orders.jsx
│       │   ├── Positions.jsx
│       │   ├── Summary.jsx
│       │   ├── WatchList.jsx
│       │   ├── BuyActionWindow.jsx
│       │   ├── SellActionWindow.jsx
│       │   ├── ProtectedRoute.jsx
│       │   └── Menu.jsx
│       └── utils/
│           └── api.js          → Axios instance with JWT interceptor
│
├── Backend/           → REST API server
│   ├── models/
│   ├── schemas/
│   ├── middleware/
│   │   └── authMiddleware.js
│   └── index.js
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/zerodha-clone.git
cd zerodha-clone
```

### 2. Setup Backend

```bash
cd Backend
npm install
```

Create a `.env` file:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=8080
```

Start the server:

```bash
npx nodemon index.js
```

### 3. Setup Frontend

```bash
cd Frontend
npm install
npm run dev
```

Runs on **http://localhost:3000**

### 4. Setup Dashboard

```bash
cd Dashboard
npm install
npm run dev
```

Runs on **http://localhost:3001**

---

## 🔐 Auth Flow

```
User signs up / logs in on Frontend (:3000)
        ↓
Backend returns JWT token
        ↓
Frontend redirects to Dashboard (:3001?token=xxx)
        ↓
Dashboard extracts token → stores in localStorage
        ↓
All API calls include: Authorization: Bearer <token>
        ↓
Logout clears localStorage → redirects to Login
```

---

## 📸 Screenshots

<!-- Add your screenshots here -->

| Page | Preview |
|---|---|
| Landing Page | _screenshot_ |
| Signup | _screenshot_ |
| Login | _screenshot_ |
| Dashboard | _screenshot_ |
| Holdings | _screenshot_ |
| Orders | _screenshot_ |

---

## 📄 API Endpoints

| Method | Route | Auth | Description |
|---|---|---|---|
| `POST` | `/signup` | ❌ | Register a new user |
| `POST` | `/login` | ❌ | Login and get JWT token |
| `GET` | `/allHoldings` | ✅ | Get user's holdings |
| `GET` | `/allPositions` | ✅ | Get user's positions |
| `GET` | `/allOrders` | ✅ | Get user's orders |
| `POST` | `/newOrder` | ✅ | Place a BUY or SELL order |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## 📜 License

This project is for educational purposes only. Not affiliated with Zerodha.
