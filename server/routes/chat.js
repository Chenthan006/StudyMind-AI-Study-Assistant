const express = require('express');
const router = express.Router();
const {
  getOrCreateChat,
  getMessages,
  sendMessage
} = require('../controllers/chatController');
const auth = require('../middleware/auth');

router.get('/:noteId', auth, getOrCreateChat);
router.get('/:chatId/messages', auth, getMessages);
router.post('/:chatId/message', auth, sendMessage);

module.exports = router;