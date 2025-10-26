# 🛒 Jayam Store – E-Commerce Platform  

A modern, fully responsive e-commerce web application built with **React**, **Zustand**, and **Tailwind CSS**, integrated with **Firebase Auth** and a local **JSON Server** backend.  

This project was developed as part of an **assignment for Jayam Web Solution Pvt Ltd**.

---

## 🚀 Features

- 🔐 **Google Login (Firebase)** — secure and instant authentication  
- 🛍 **Product Listing + Wishlist + Cart** — fully dynamic via Zustand state management  
- 🧾 **Order Management** — place, track and view orders per user  
- 💾 **Persistent Storage** — local JSON Server + Zustand persist layer  
- ☁️ **Cloudinary Integration** — lightning-fast image delivery from the cloud  
- ⚡ **Responsive UI** — optimized for mobile and desktop  
- 💫 **Smooth Animations** — Framer Motion for modern transitions  
- ❤️ **Toast Feedbacks** — clean user notifications for wishlist and cart actions  

---

## 🧰 Tech Stack and Purpose

| Technology | Purpose / Usage |
|-------------|----------------|
| **React JS** | Core UI library for building interactive and reactive components |
| **Tailwind CSS** | Utility-first styling for rapid and consistent UI development |
| **Zustand** | Lightweight state management for cart, wishlist, and orders |
| **Framer Motion** | Animation framework for smooth UI transitions and scroll reveals |
| **Axios** | Simplified HTTP requests to JSON Server (API layer) |
| **JSON Server** | Mock backend API for products, orders and user data |
| **Cloudinary** | CDN for storing and serving product images at high speed |
| **Firebase Auth** | Google Sign-In integration for authentication |
| **Lucide Icons** | Modern React icon pack for clean and lightweight UI icons |
| **React Hot Toast** | Toast notifications for user feedback |
| **React Router DOM** | SPA navigation and protected routes management |
| **Git / GitHub** | Version control and collaboration platform |

---

## ⚙️ Project Setup Guide

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/jayam-store.git
cd jayam-store
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start JSON Server

- Make sure you have json-server installed globally:

```bash
npm install -g json-server
```

- Run it on port 3000:

```bash
json-server --watch db.json --port 3000
```

### 4️⃣ Start the React App

```bash
npm run dev
```

- Your app will be available at 👉 http://localhost:5173/

---

### 🌩 Cloudinary Setup

All product images are stored on Cloudinary for faster page loading.
Replace your own Cloudinary URLs in db.json or use the uploaded demo URLs.

---

### 🌩 🔐 Firebase Setup

1. Create a project in Firebase Console
2. Enable Google Authentication
3. Add your Firebase config keys to src/Utilize/Firebase.js

```bash
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};
```

---

### 🧠 Folder Structure

src/
│
├── Components/
│   ├── Product/
│   ├── Cart/
│   ├── Wishlist/
│   ├── Orders/
│   └── Navbar/
│
├── Store/          → Zustand store (logic for cart, wishlist, orders)
├── Utilize/        → Firebase utility and helper functions
└── assets/         → Static images and icons

---

### 🧾 API Endpoints (JSON Server)

- Endpoint  	- Description
- /products	    - Get all products
- /categories	- Get all categories
- /wishlist	    - User wishlist items
- /cart	        - User cart items
- /orders	    - User orders
- /addresses	- User saved addresses

---

### ✨ Key Highlights

🔸 Minimal and modern UI design

🔸 Real-time state management (Zustand)

🔸 Fully responsive mobile experience

🔸 Cloud-based assets (CDN optimized)

🔸 Smooth animations and user feedback

---

### 🧑‍💻 Developer

Rajesh P
Assignment submitted to Jayam Web Solution Pvt Ltd

📧 rajesh.p262003@gmail.com
🔗 LinkedIn : https://www.linkedin.com/in/code-rajesh/
🔗 Website  : saktrix.vercel.app

---
