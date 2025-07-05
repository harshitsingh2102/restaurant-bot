const bcrypt = require('bcrypt');

bcrypt.hash("123456", 10).then(hash => {
  console.log("Hashed password:", hash);
}).catch(err => {
  console.error("Error hashing password:", err);
});
