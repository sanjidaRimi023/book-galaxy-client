# 📚 Book Galaxy - Book Management Web App

Book Galaxy is a modern, feature-rich **Book Management Platform** built using **React**, **Firebase Authentication**, **Tailwind CSS**, and **MongoDB (via backend API)**. Users can explore categories, borrow books, submit reviews, and more.

---

## ✨ Features

- 🔐 Firebase Authentication (Login/Register)
- 📚 View & Manage Books (Add/Update/Delete)
- 📦 Borrow & Return System
- 🗂️ Filter Books by Category
- ⭐ Book Ratings & Tips
- 🧑‍💼 User Dashboard for Borrowed Books
- 🔐 Protected Routes using Private Route
- 🛡️ JWT token included for secure API calls
- 🎨 Tailwind CSS Styling + Motion Effects
- 🧾 Toast Notifications & Update Modal

---

## 🌐 Live Demo

🔗 [Live Website](https://your-live-link.com)

---

## 📁 Project Structure

library-management-client/
├── public/
├── src/
│ ├── assets/
│ ├── Components/
│ ├── Context/
│ ├── Firebase/
│ ├── Hooks/
│ ├── Layout/
│ ├── Pages/
│ ├── Router/
│ ├── main.jsx
│ └── index.css
├── .env.local
├── vite.config.js
└── package.json

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/your-username/library-management-client.git

cd book-galaxy-client

2️⃣ Install Dependencies

npm install


3️⃣ Environment Setup
Create a .env.local file and add:

env

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_BASE_URL=http://localhost:5000

4️⃣ Run the App

npm run dev
Visit: http://localhost:5173

🧩 Tech Stack
React – Component-based UI

React Router DOM – Client-side routing

Firebase Auth – User authentication

Axios – API communication

JWT – Token-based security

Tailwind CSS – Styling

React Hook Form – Form handling

Framer Motion + Lottie – Animations

React Hot Toast – Notification system


