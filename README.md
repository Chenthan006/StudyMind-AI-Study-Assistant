<div align="center">

# 🧠 StudyMind
### AI-Powered Study Assistant

**Upload your notes. Get AI summaries. Chat with your documents. Quiz yourself.**

[![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://mysql.com/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Groq](https://img.shields.io/badge/Groq_AI-F55036?style=for-the-badge)](https://groq.com/)

</div>

---

## 📌 Overview

StudyMind is a full-stack SaaS web application that transforms uploaded study documents into AI-generated summaries, interactive quizzes, and context-aware conversations — powered by LLaMA 3 via Groq and a RAG (Retrieval-Augmented Generation) pipeline.

---

## ✅ Features

| Feature | Description |
|---------|-------------|
| 🔐 Authentication | JWT-based login & register with bcrypt |
| 📂 Notes Upload | PDF & TXT file upload with text extraction |
| 🧠 AI Summary | Instant AI summaries from your documents |
| 💬 AI Chat | RAG-based Q&A grounded in your notes |
| 🧪 Quiz Generator | Auto MCQ generation with instant scoring |
| 👤 User Profile | Account, security & preference management |
| 🔍 Search | Live search across all uploaded notes |

---

## 📸 Screenshots

### Landing Page
![Landing](screenshots/Landingpage_P1.png)
![Features](screenshots/Landingpage_P2.png)
![FAQ](screenshots/Landingpage_P3.png)
![CTA](screenshots/Landingpage_P4.png)
![Footer](screenshots/Landingpage_P5.png)

### Authentication
![Login](screenshots/Login.png)
![Register](screenshots/Register.png)

### Dashboard
![Dashboard](screenshots/Dashboard.png)
![Upload](screenshots/Fileuploade.png)
![Delete](screenshots/Deleteuploadenote.png)

### AI Features
![Summary](screenshots/GenerateSummary.png)
![Summary + Quiz + Chat](screenshots/Generatesummary_Quizz_Chat.png)

### Quiz
![Quiz P1](screenshots/Quizz_P1.png)
![Quiz P2](screenshots/Quizz_P2.png)
![Answers](screenshots/Quizz_answer.png)
![Score](screenshots/Quizz_answer_P2.png)

### Profile
![Account](screenshots/Profile.png)
![Security](screenshots/Profile_security.png)
![Preferences](screenshots/Profile_pereference.png)
![Danger Zone](screenshots/Profile_Dangerzone.png)

---

## 🛠 Tech Stack

### Frontend
- React 18 + Vite
- Tailwind CSS
- React Router DOM
- Axios

### Backend
- Node.js + Express.js
- MySQL 8 + mysql2
- JWT Authentication
- Bcrypt.js
- Multer + pdf-parse

### AI
- Groq API (LLaMA 3.3 70B)
- RAG Architecture

---

## 📁 Project Structure

```
studymind/
├── client/
│   └── src/
│       ├── pages/
│       │   ├── Landing.jsx
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Dashboard.jsx
│       │   ├── NotePage.jsx
│       │   └── Profile.jsx
│       ├── services/
│       │   └── api.js
│       └── App.jsx
│
└── server/
    ├── controllers/
    │   ├── authController.js
    │   ├── noteController.js
    │   └── chatController.js
    ├── routes/
    │   ├── auth.js
    │   ├── notes.js
    │   └── chat.js
    ├── middleware/
    │   └── auth.js
    ├── utils/
    │   └── aiService.js
    ├── db.js
    └── app.js
```

---

## 🗃 Database

MySQL relational database with 4 core tables — `users`, `notes`, `chats`, and `messages` — structured to support user-scoped data, file metadata, and persistent chat history.

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MySQL 8.0
- Groq API Key → [console.groq.com](https://console.groq.com)

### Backend Setup
```bash
cd server
npm install
```

Create `server/.env`:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ai_study_assistant
JWT_SECRET=your_secret
GROQ_API_KEY=your_groq_key
```

```bash
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173`

---

## 📡 API Reference

RESTful API built with Express.js. All protected routes require a Bearer JWT token in the Authorization header.

Core modules: **Auth** · **Notes** · **AI Summary** · **Quiz** · **Chat**

---

## 🧠 AI Pipeline (RAG)

```
User uploads PDF/TXT
       ↓
Text extracted → stored in MySQL
       ↓
User sends query
       ↓
Note text retrieved from DB
       ↓
Context + Query → Groq (LLaMA 3.3 70B)
       ↓
Grounded response → saved + displayed
```

---

## 🔐 Security

- Passwords hashed with **bcrypt** (10 salt rounds)
- **JWT tokens** expire in 7 days
- All routes protected with auth middleware
- Users can only access their own data

---

## 📄 License & Copyright

```
Copyright © 2026 D. Chenthan. All Rights Reserved.

This project and all its contents are the intellectual property of D. Chenthan.
Unauthorized copying, modification, distribution, or use of this project
in any form is strictly prohibited without explicit written permission.

This repository is published for portfolio and demonstration purposes only.
```

---

<div align="center">

**Built by D. Chenthan**

Software Engineering Undergraduate · NSBM Green University · Sri Lanka 🇱🇰

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/d-chenthan-25018535b)
[![GitHub](https://img.shields.io/badge/GitHub-Chenthan006-181717?style=for-the-badge&logo=github)](https://github.com/Chenthan006)

*© 2026 D. Chenthan · All Rights Reserved*

</div>
