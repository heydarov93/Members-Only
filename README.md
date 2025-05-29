# TOP Clubhouse App 🗝

A members-only message board where users can write anonymous posts, gain membership through a secret passcode, and unlock special permissions.

> This project was developed as part of The Odin Project's Node.js curriculum, specifically the [Authentication section](https://www.theodinproject.com/lessons/node-path-nodejs-members-only).

**🔴 Live:** [demo link](https://top-clubhouse-server.onrender.com/)
> [!WARNING] 
> The live demo may experience downtime as it is hosted on a free service. For guaranteed access, please [run locally](#-run-locally) using the instructions below.

<br>

## 📜 Overview

TOP Clubhouse is a private posting platform where users can share anonymous posts. It defines four user roles—guest, normal user, member, and admin—each with specific permissions. The main focus of this project is implementing robust **authentication** and **authorization** logic; the UI is intentionally minimal to emphasize backend functionality. The app is built with Node.js and Express.js for the server, using EJS/Bootstrap for simple frontend views. All user data and posts are stored in a PostgreSQL database, and passwords are securely hashed with bcryptjs.

**🗝 Membership passcode:** `LetMeInPlease`

**Become a Member**

1. Create an account (if you don't have one)
2. Log in
3. Navigate to your Profile Page:
   - Click the dropdown menu at the top-right corner
   - Select "Profile"
4. Enter the membership passcode in the designated input
5. Submit to activate membership privileges

<br>

## ✨ Features

- **Pages**:
  - Home - displays all posts
  - Signup/Login
  - Delete-post form
  - User profile
  - Post details
  - Post forms (create/update)
- **Authentication & Security**:
  - Secure login system using email & password
  - Password protection with bcrypt hashing
  - Session management with express-session
- **User Actions**:
  - Create, read, update and delete posts.
  - Become a member.
  - Become an admin.
- **Guest User Actions**:
  - See overview of the posts
  - For any interaction redirected to login page
- **Logged User Actions**:
  - Create and manage your own posts
  - Read all posts with limited access
- **Member Actions**:
  - All guest priveleges
  - Full access to the content (posts)
- **Admin Actions**:
  - All member priveleges
  - Delete any post

<br>

## 📚 Tech Stack

**Client:** HTML, EJS, CSS, Bootstrap, JavaScript

**Server:** Node.js, Express.js

**Database:** PostgreSQL

**Dependencies:**

- bcryptjs, passport, express-session (Authentication)

- pg, connect-pg-simple (PostgreSQL integration)

- express-validator (Form validation)

- nodemon (Dev server)

- dotenv (Environment variables)

<br>

## ⚙ Prerequisites

Before running the project, ensure you have installed:

- **Node.js**

- **PostgreSQL**

**🔧 Troubleshooting**

If you encounter errors:

Verify installations:

```bash
node --version
psql --version
```

Upgrade if versions are outdated.

**✅ Recommended Versions**

- **Node.js**: `v22.14.0`

- **PostgreSQL**: `17.4`

<br>

## 💻 Run Locally

Clone the project

```bash
  git clone https://github.com/heydarov93/Members-Only.git
```

Go to the project directory

```bash
  cd Members-Only
```

Install dependencies

```bash
  npm install
```

Create tables

```bash
  npm run init-db
```

Start the server

```bash
  npm start
```

After starting, visit `http://localhost:3000` in your browser to see the app (guests view).

<br>

## 📌 Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`APP_PORT` = 3000

`DB_HOST` = localhost

`DB_USER` = your_db_user

`DB_NAME` = your_db_name

`DB_PASSW` = your_db_password

`DB_PORT` = 5432

`SESSION_SECRET` = your_session_secret

`ADMIN_KEY` = secret_admin_key

`MEMBER_KEY` = secret_member_key

<br>

## 🌐 Routes

**🏠 Main Routers:**

<mark>_/_</mark>

<mark>_/auth_</mark>

<mark>_/users_</mark>

<mark>_/posts_</mark>

**🔓 Public routes:**

<mark>_GET /_</mark> - Home page, displays all posts

<mark>_GET /auth/signup_</mark> - Signup page

<mark>_POST /auth/signup_</mark> - Signs up user

<mark>_GET /auth/login_</mark> - Login page

<mark>_POST /auth/login_</mark> - Logs in user

**🔒 Protected routes - Authentication/Authorization required:**

<mark>_POST /auth/logout_</mark> - Logs out user

<mark>_GET /users/profile_</mark> - Profile page of the current (logged in) user

<mark>_POST /users/grant-admin_</mark> - Grant a user admin privileges

<mark>_POST /users/grant-membership_</mark> - Grant a user membership

<mark>_GET /posts/:id_</mark> - Post details page

<mark>_GET /posts/create_</mark> - Post submission form

<mark>_POST /posts/create_</mark> - Submit a new post

<mark>_GET /posts/update/:id_</mark> - Form for updating a post

<mark>_POST /posts/update/:id_</mark> - Update a post

<mark>_GET /posts/delete/:id_</mark> - Confirmation form for deleting a post

<mark>_POST /posts/delete/:id_</mark> - Delete a post

<br>

## 🌳 Project Structure

```
Members-Only/
├── app.js                    # Express application entry point
├── config/
│   ├── database.js           # PostgreSQL connection setup
│   └── passport.js           # Passport authentication configuration (strategies, etc.)
├── controllers/
│   ├── auth-controller.js    # Handles login/signup logic
│   ├── index-controller.js   # Homepage and general routes
│   ├── posts-controller.js   # Post CRUD logic
│   └── users-controller.js   # User profile and role upgrades
├── db/
│   ├── init-db.js            # Database initialization (tables/schema)
│   └── queries.js            # Raw SQL queries for complex operations
├── error/                    # Custom error handlers (404, 403 etc.)
├── middlewares/
│   ├── auth-middlewares.js   # Authentication checks (isAuth, etc.)
│   ├── posts-middlewares.js  # Post authorization validation, etc.
│   ├── set-current-user.js   # Locals user injection for views
│   ├── set-notification.js   # Flash message handling
│   ├── validate-*.js         # Form, params and etc. validations (signup, posts, roles)
├── public/                   # Static assets (CSS/JS/images)
├── routes/
│   ├── auth-router.js        # Login/signup/logout routes
│   ├── index-router.js       # Homepage and public routes
│   ├── posts-router.js       # Post-related CRUD routes
│   └── users-router.js       # Profile and role management routes
├── utils/                    # Helper functions (optional)
└── views/                    # EJS templates (layouts, partials, pages)

```

> [!NOTE]
>
> Some functions or classes in these directories may be unused:
>
> `middlewares/`
>
> `utils/`
>
> `error/`

<br>

## ⚖ License

This project is open-source and available under the [MIT License](LICENSE).

<br>

<br>

## ✒ Authors

Yashar Heydarov - [Github](https://github.com/heydarov93) / [Linkedin](https://www.linkedin.com/in/yashar-heydarov/)
