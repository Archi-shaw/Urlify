# 📦 URL Shortener with Analytics & User Auth

A simple and powerful URL Shortener built with **Node.js**, **Express**, **MongoDB**, and **EJS**. Features include:

- ✂️ Short URL generation using `nanoid`
- 📊 Basic analytics (click tracking + view history)
- 🧑‍💻 User authentication using token-based cookies
- 📄 EJS templating for frontend views
- 🧹 URL deletion + dynamic routing

---

## 🗂 Folder Structure

```

.
├── models/
│   └── url.js
├── routes/
│   ├── url.js
│   └── staticroute.js
├── controllers/
│   └── url.js
├── service/
│   └── auth.js
├── views/
│   ├── home.ejs
│   ├── login.ejs
│   └── signup.ejs
├── .env
└── server.js

````

---

# ✅ Setup Instructions

## Install dependencies
```
npm install

##Add .env file
PORT=3000
MONGODB_URL=your_mongodb_uri
JWT_SECRET=your_secret

# Run server
npm start


