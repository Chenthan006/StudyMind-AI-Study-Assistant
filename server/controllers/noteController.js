require('dotenv').config();
const db = require('../db');
const fs = require('fs');
const ai = require('../utils/aiService');

let pdfParse;
try {
  pdfParse = require('pdf-parse');
} catch(e) {
  console.log('pdf-parse not loaded');
}

exports.uploadNote = async (req, res) => {
  try {
    const { title } = req.body;
    let extractedText = '';

    if (req.file.mimetype === 'application/pdf' && pdfParse) {
      const dataBuffer = fs.readFileSync(req.file.path);
      const data = await pdfParse(dataBuffer);
      extractedText = data.text;
    } else if (req.file.mimetype === 'application/pdf') {
      extractedText = `PDF_FILE:${req.file.path}`;
    } else {
      extractedText = fs.readFileSync(req.file.path, 'utf8');
    }

    await db.query(
      'INSERT INTO notes (user_id, title, file_path, extracted_text) VALUES (?, ?, ?, ?)',
      [req.user.id, title, req.file.path, extractedText]
    );
    res.json({ message: 'Note uploaded successfully!' });
  } catch (err) {
    console.log('UPLOAD ERROR:', err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const [notes] = await db.query(
      'SELECT id, title, created_at FROM notes WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNote = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM notes WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Note not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.generateSummary = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM notes WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Note not found' });
    const note = rows[0];
    let text = note.extracted_text;
    console.log('TEXT START:', text?.slice(0, 100));
    if (!text || text.startsWith('PDF_FILE:')) {
      return res.status(400).json({ error: 'PDF text extraction not ready. Upload a TXT file.' });
    }
    const summary = await ai.generateSummary(text);
    console.log('SUMMARY:', summary?.slice(0, 100));
    await db.query('UPDATE notes SET summary = ? WHERE id = ?', [summary, note.id]);
    res.json({ summary });
  } catch (err) {
    console.log('SUMMARY ERROR:', err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    await db.query('DELETE FROM notes WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    res.json({ message: 'Note deleted!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.generateQuiz = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM notes WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Note not found' });
    const text = rows[0].extracted_text;
    if (!text || text.startsWith('PDF_FILE:')) {
      return res.status(400).json({ error: 'PDF not ready' });
    }
    const quiz = await ai.generateQuiz(text);
    res.json({ quiz });
  } catch (err) {
    console.log('QUIZ ERROR:', err.message);
    res.status(500).json({ error: err.message });
  }
};