
# 🌐 Urlify – URL Shortener

A full-stack **URL Shortener app** with authentication (signup/login) built using **React (frontend)**, **Node.js + Express (backend)**, and **MongoDB**.

---

## 🚀 Features
- Shorten long URLs into custom short links  
- User authentication (Signup/Login)  
- Track URL visit history  
- Deployed on **Render**  

---

## 🛠️ Tech Stack
- **Frontend**: React (Vite) + TailwindCSS  
- **Backend**: Node.js + Express  
- **Database**: MongoDB Atlas  
- **Deployment**: Render  

---

## 📂 Project Structure
```

Urlify/
│── client/          # Frontend (React)
│   ├── src/
│   └── package.json
│
│── server/          # Backend (Express)
│   ├── routes/
│   ├── models/
│   ├── config/
│   └── index.js
│
└── README.md

````

---

## ⚙️ Setup (Local)

### 1. Clone Repo
```bash
git clone https://github.com/Archi-shaw/Urlify.git
cd Urlify
````

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```
PORT=8000
MONGODB_URL=your-mongodb-uri
JWT_SECRET=your-secret-key
```

Run backend:

```bash
npm start
```

Backend will be available at:

```
http://localhost:8000
```

---

### 3. Setup Frontend

```bash
cd ../client
npm install
npm run dev
```

Frontend will be available at:

```
http://localhost:5173
```

---

