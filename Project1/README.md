# WED+ Banquet Booking Platform

A full-stack banquet hall booking application built with the MERN stack (MongoDB, Express, React, Node.js).

## Project Structure

```
Project1/
├── backend/                 # Express + MongoDB API
│   ├── config/
│   │   └── db.js            # MongoDB connection
│   ├── models/
│   │   ├── Banquet.js       # Banquet listing schema
│   │   └── UserAccount.js   # Login/signup account schema
│   ├── routes/
│   │   ├── auth.js          # Signup, login, email routes
│   │   ├── banquet.js       # Create/update banquet listings
│   │   └── userData.js      # Fetch stored banquet data
│   ├── .env.example         # Template for required environment variables
│   ├── .env                 # Local environment variables (not committed)
│   ├── package.json
│   └── server.js            # App entry point
│
└── frontend/                 # React application
    ├── public/
    └── src/
        ├── assets/images/    # Shared image assets
        ├── components/       # Reusable UI pieces (Nav, Nav2, forms)
        ├── pages/             # One folder per route/page
        │   ├── Login/
        │   ├── Signup/
        │   ├── Home/
        │   ├── Blog/
        │   ├── Services/
        │   ├── About/
        │   └── BanquetDetails/
        ├── routes/
        │   └── ProtectedRoute.js
        └── index.js           # App routes + entry point
```

## Getting Started

### Backend

```bash
cd backend
npm install
npm run dev      # starts with nodemon on http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
npm start         # starts on http://localhost:3000
```

## Environment Variables

The backend reads configuration from `backend/.env` (see `backend/.env.example` for the full list):

- `MONGO_URI` – MongoDB connection string
- `JWT_SECRET` – secret used to sign login tokens
- `PORT` – API port (default 5000)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_MAIL`, `SMTP_PASSWORD` – used to send inquiry emails via Nodemailer

## ⚠️ Security note

The original project had a MongoDB connection string (with username/password) hardcoded directly in `backend/db.js`, and real SMTP credentials committed in `backend/.env`. Both have been moved into environment variables so they're no longer baked into source code — but because these credentials were already exposed in the version of the project you shared, it's a good idea to **rotate the MongoDB password and the Gmail app password** before submitting or publishing this project publicly (e.g. push it to GitHub), and make sure `.env` stays out of version control (it's already listed in `backend/.gitignore`).

## What changed from the original zip

- Split the frontend into `components/` (shared UI) and `pages/` (one folder per route), each with its own JS/CSS instead of everything living loosely under `first.js/`, `secondpage/`, and `third page/`.
- Moved all images into `src/assets/images/` and fixed the CSS `url()` paths to match.
- Fixed a pre-existing bug in `index.js`: it imported `./thired page/banquet` (typo) which didn't match the actual folder name and would have crashed the app when navigating to `/banquet`.
- Split the backend's single `routes/createuser.js` into `routes/auth.js` (signup/login/email) and `routes/banquet.js` (create/update listings), added a `config/` folder for the DB connection, and renamed the models to `Banquet.js` / `UserAccount.js` for clarity (the underlying Mongoose model names and MongoDB collections are unchanged, so existing data still works).
- Removed the committed `frontend/build/` folder — build output shouldn't be checked into source; run `npm run build` when you need it.
- Added `.gitignore` files so `node_modules` and `.env` don't get committed.
