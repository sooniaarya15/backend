require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const skillsRoutes = require('./routes/skillsRoutes');
const projectsRoutes = require('./routes/projectsRoutes');
const blogsRoutes = require('./routes/blogsRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const testimonialsRoutes = require('./routes/testimonialsRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// ---- Core middleware ----
const allowedOrigins = (process.env.CLIENT_URLS || '').split(',').map((s) => s.trim()).filter(Boolean);
app.use(cors({
  origin: allowedOrigins.length ? allowedOrigins : '*',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically: http://localhost:5000/uploads/filename.jpg
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// ---- Health check ----
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio CMS API is running' });
});

// ---- Routes ----
app.use('/auth', authRoutes);
app.use('/about', aboutRoutes);
app.use('/skills', skillsRoutes);
app.use('/projects', projectsRoutes);
app.use('/blogs', blogsRoutes);
app.use('/experience', experienceRoutes);
app.use('/testimonials', testimonialsRoutes);
app.use('/services', servicesRoutes);
app.use('/upload', uploadRoutes);
app.use('/contact', contactRoutes);

// ---- 404 handler ----
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ---- Global error handler ----
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});