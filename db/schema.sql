-- ============================================================
-- Portfolio CMS Database Schema
-- Run this in Supabase: Dashboard -> SQL Editor -> New Query
-- ============================================================

-- Admin / CMS users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,       -- bcrypt hash, never plain text
  role VARCHAR(30) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT NOW()
);

-- About (singleton - one row, PUT to update)
CREATE TABLE IF NOT EXISTS about (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(150),
  title VARCHAR(150),
  bio TEXT,
  profile_image VARCHAR(500),
  resume_url VARCHAR(500),
  location VARCHAR(150),
  email VARCHAR(150),
  social_links JSONB DEFAULT '{}',
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  category VARCHAR(80),
  proficiency INT CHECK (proficiency BETWEEN 0 AND 100),
  icon VARCHAR(255),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(220) UNIQUE,
  description TEXT,
  tech_stack JSONB DEFAULT '[]',
  image VARCHAR(500),
  live_url VARCHAR(500),
  repo_url VARCHAR(500),
  featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blogs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(220) NOT NULL,
  slug VARCHAR(240) UNIQUE,
  cover_image VARCHAR(500),
  excerpt TEXT,
  content TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS experience (
  id SERIAL PRIMARY KEY,
  company VARCHAR(180) NOT NULL,
  role VARCHAR(180),
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  author_name VARCHAR(150) NOT NULL,
  author_role VARCHAR(150),
  author_image VARCHAR(500),
  message TEXT,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  description TEXT,
  icon VARCHAR(255),
  price VARCHAR(80),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  subject VARCHAR(220),
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS media (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  url VARCHAR(500) NOT NULL,
  mime_type VARCHAR(100),
  size_bytes INT,
  uploaded_at TIMESTAMP DEFAULT NOW()
);