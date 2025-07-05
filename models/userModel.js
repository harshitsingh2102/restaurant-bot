const db = require('../db');

const User = {
  register: (name, email, password) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
      db.query(query, [name, email, password], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  login: (email, password) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
      db.query(query, [email, password], (err, results) => {
        if (err) return reject(err);
        if (results.length === 0) return resolve(null);
        resolve(results[0]);
      });
    });
  }
};

module.exports = User;
