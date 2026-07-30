const db = require('../db');
const ai = require('../utils/aiService');

exports.getOrCreateChat = async (req, res) => {
  try {
    let [chats] = await db.query(
      'SELECT * FROM chats WHERE note_id = ? AND user_id = ?',
      [req.params.noteId, req.user.id]
    );
    if (!chats.length) {
      const [result] = await db.query(
        'INSERT INTO chats (user_id, note_id) VALUES (?, ?)',
        [req.user.id, req.params.noteId]
      );
      chats = [{ id: result.insertId }];
    }
    res.json({ chatId: chats[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const [messages] = await db.query(
      'SELECT * FROM messages WHERE chat_id = ? ORDER BY timestamp ASC',
      [req.params.chatId]
    );
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const chatId = req.params.chatId;

    const [chats] = await db.query(
      'SELECT chats.*, notes.extracted_text FROM chats JOIN notes ON chats.note_id = notes.id WHERE chats.id = ?',
      [chatId]
    );
    if (!chats.length) return res.status(404).json({ error: 'Chat not found' });

    const noteText = chats[0].extracted_text;

    const [prevMessages] = await db.query(
      'SELECT role, content FROM messages WHERE chat_id = ? ORDER BY timestamp DESC LIMIT 10',
      [chatId]
    );
    const history = prevMessages.reverse().map(m => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.content }));

    await db.query('INSERT INTO messages (chat_id, role, content) VALUES (?, ?, ?)', [chatId, 'user', message]);

    const aiResponse = await ai.chatWithNotes(noteText, message, history);

    await db.query('INSERT INTO messages (chat_id, role, content) VALUES (?, ?, ?)', [chatId, 'ai', aiResponse]);

    res.json({ response: aiResponse });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};