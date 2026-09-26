# Portfolio CMS Backend

A custom-built (no Strapi/Sanity) Content Management System backend for a
developer portfolio, built with Node.js, Express, and PostgreSQL (Supabase).

## Features
- JWT-based admin authentication (bcrypt-hashed passwords)
- Full CRUD REST API for About, Skills, Projects, Blogs, Experience, Testimonials, Services
- Image upload endpoint (Multer) with a `media` log table
- Contact form endpoint that saves messages to the DB and optionally emails via Nodemailer
- Clean, factory-based CRUD controllers/routes (no repeated boilerplate per resource)

## Tech Stack
Node.js, Express.js, PostgreSQL (Supabase), JWT, bcrypt, Multer, Nodemailer

## Setup
See `.env.example` for required environment variables, run `backend/db/schema.sql`
in your Supabase SQL editor, then:

\`\`\`powershell
npm install
npm run seed:admin
npm run dev
\`\`\`

## API Overview

| Method | Route | Auth |
|---|---|---|
| POST | /auth/login | Public |
| POST | /auth/refresh | Admin |
| GET | /about | Public |
| PUT | /about | Admin |
| GET | /skills, /projects, /blogs, /experience, /testimonials, /services | Public |
| POST/PUT/DELETE | /skills, /projects, /blogs, /experience, /testimonials, /services | Admin |
| POST | /upload/image | Admin |
| POST | /contact | Public |