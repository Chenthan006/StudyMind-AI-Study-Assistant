const express = require('express');
const router = express.Router();
const { uploadNote, getNotes, deleteNote, getNote, generateSummary, generateQuiz, generateFlashcards } =
  require('../controllers/noteController');
const auth = require('../middleware/auth');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.post('/upload', auth, upload.single('file'), uploadNote);
router.get('/', auth, getNotes);
router.get('/:id', auth, getNote);
router.post('/:id/summary', auth, generateSummary);
router.post('/:id/quiz', auth, generateQuiz);
router.delete('/:id', auth, deleteNote);
router.post('/:id/flashcards', auth, generateFlashcards);

module.exports = router;