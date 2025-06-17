# 📚 Book Galaxy - Book Management Web App

**Book Galaxy** is a modern, responsive, and feature-rich **Book Management Platform** built using **React**, **Firebase Authentication**, **Tailwind CSS**, **Framer Motion**, and **MongoDB (via a backend API)**. It allows users to explore books by category, borrow and return them, manage their library, and much more.

---

## ✨ Features

- 🔐 **Authentication** with Firebase (Login/Register)
- 📚 **Book Management** – Add, Edit, Delete Books
- 📦 **Borrow & Return System** with user dashboard
- 🗂️ **Filter by Categories** to explore books
- ⭐ **Book Ratings & Tips** from users
- 👤 **Dashboard** to manage borrowed books
- 🔐 **Protected Routes** using JWT & PrivateRoute
- 🛡️ **JWT Token Security** for API calls
- 🎨 Styled with **Tailwind CSS** and **Framer Motion**
- 🔔 Toast Notifications & Smooth Modal Updates

---

## 🌐 Live Demo

🔗 [Live Website](https://your-live-link.com)

---

## 📁 Project Structure

book-galaxy-client/
├── public/
├── src/
│ ├── assets/ # Static images, icons, animations
│ ├── Components/ # Reusable components (Cards, Buttons, etc.)
│ ├── Context/ # Auth context provider
│ ├── Firebase/ # Firebase config
│ ├── Hooks/ # Custom hooks
│ ├── Layout/ # Layout wrappers (e.g., Navbar, Footer)
│ ├── Pages/ # Route-level pages
│ ├── Router/ # React Router config
│ ├── main.jsx # App entry point
│ └── index.css # Global Tailwind styles
├── .env.local # Environment variables (not pushed to Git)
├── vite.config.js # Vite configuration
└── package.json # Project dependencies


---

## ⚙️ Installation & Setup

### 🔧 1. Clone the Repository

```bash
git clone https://github.com/your-username/library-management-client.git
cd library-management-client

📦 2. Install Dependencies

```bash
npm install

🔑 3. Environment Configuration
Create a .env.local file in the root directory and add your Firebase and backend credentials:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_BASE_URL=http://localhost:5000


🚀 4. Run the Development Server
```bash
npm run dev
Visit your local app at: http://localhost:5173

🧩 Tech Stack

| Tech                | Purpose                       |
| ------------------- | ----------------------------- |
| **React**           | Component-based UI            |
| **React Router**    | Client-side routing           |
| **Firebase Auth**   | User Authentication           |
| **Axios**           | API requests                  |
| **JWT**             | Secure backend communication  |
| **Tailwind CSS**    | Utility-first CSS framework   |
| **React Hook Form** | Form validation and handling  |
| **Framer Motion**   | Animations and motion effects |
| **Lottie React**    | Animated illustrations        |
| **React Hot Toast** | User notifications            |

📌 Contributing
Feel free to fork the repository and create pull requests if you'd like to contribute. Make sure to follow good coding practices and proper commit messages.

