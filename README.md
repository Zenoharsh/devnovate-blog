# Devnovate Blog - VIBE HACK 2025

A full-stack blogging platform built with the MERN stack (MongoDB, Express.js, React, Node.js) for the VIBE HACK 2025 hackathon. The platform features a complete user authentication system and an admin-controlled content approval workflow.

---

## 🚀 Live Demo

**The fully deployed application is live at:** [https://devnovate-blog.onrender.com](https://devnovate-blog.onrender.com)

---

## ✨ Features

* **User Authentication**: Secure signup and login functionality using JSON Web Tokens (JWT).
* **Article Submission**: Logged-in users can create and submit articles for publication.
* **Admin Content Approval**: An admin dashboard allows for the approval, rejection, or deletion of user-submitted articles.
* **Public Homepage**: The main page displays all a_pproved_ articles for public viewing.
* **User Profile**: A dedicated page for users to view the status of their own submitted articles.
* **Protected Routes**: Backend middleware ensures that only authenticated users can create posts and only admins can access management features.

---

## 🛠️ Tech Stack

* **Frontend**: React (with Vite), Axios
* **Backend**: Node.js, Express.js
* **Database**: MongoDB with Mongoose
* **Authentication**: JWT, bcryptjs
* **Deployment**: Render

---

## ⚙️ API Endpoints

| Method | Endpoint                         | Access    | Description                               |
| :----- | :------------------------------- | :-------- | :---------------------------------------- |
| `POST` | `/api/auth/signup`               | Public    | Register a new user.                      |
| `POST` | `/api/auth/login`                | Public    | Log in a user and receive a JWT.          |
| `GET`  | `/api/articles`                  | Public    | Get all approved articles.                |
| `POST` | `/api/articles`                  | Private   | Submit a new article for approval.        |
| `GET`  | `/api/articles/my-articles`      | Private   | Get all articles submitted by the user.   |
| `GET`  | `/api/admin/pending`             | Admin     | Get all articles pending approval.        |
| `PUT`  | `/api/admin/articles/:id/approve`| Admin     | Approve a pending article.                |
| `DELETE`| `/api/admin/articles/:id`        | Admin     | Delete any article.                       |

---

## 📦 Local Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/devnovate-blog.git](https://github.com/your-username/devnovate-blog.git)
    cd devnovate-blog
    ```

2.  **Create a `.env` file** in the root directory and add the following variables:
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=5001
    ```

3.  **Install dependencies** for both the server and the client:
    ```bash
    # Install server dependencies
    npm install

    # Install client dependencies
    npm install --prefix client
    ```

4.  **Run the application:**
    *To run just the backend server:*
    ```bash
    npm start
    ```
    *To run the frontend client (Vite dev server):*
    ```bash
    npm run dev --prefix client
    ```
