const db = require('../db');

const User = {
  create: (name, email, password) => {
    return db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
  },
  findByEmail: (email) => {
    return db.query('SELECT * FROM users WHERE email = ?', [email]);
  }
};

module.exports = User;