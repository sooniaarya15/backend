const pool = require('../config/db');

// POST /upload/image  (multipart/form-data, field name "image")
async function uploadImage(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: 'No image file provided' });
  }

  const fileUrl = `/uploads/${req.file.filename}`;

  try {
    await pool.query(
      'INSERT INTO media (filename, url, mime_type, size_bytes) VALUES ($1, $2, $3, $4)',
      [req.file.filename, fileUrl, req.file.mimetype, req.file.size]
    );
  } catch (err) {
    console.error('Failed to log media record (upload still succeeded):', err);
  }

  res.status(201).json({
    message: 'Image uploaded successfully',
    url: fileUrl,
    filename: req.file.filename,
  });
}

module.exports = { uploadImage };