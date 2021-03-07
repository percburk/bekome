const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const socket = require('socket.io');

// Making socket.io instance, adding CORS
const io = socket(5001, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Initializing socket.io connection
io.on('connection', (socket) => {
  const { id } = socket.client;
  console.log(`User connected: ${id}`);
  socket.on('SEND_MESSAGE', (data) => {
    console.log(data);
    const sqlText = `
      INSERT INTO "messaging" ("users_id", "author", "message")
      VALUES ($1, $2, $3);
    `;
    pool
      .query(sqlText, [data.id, data.author, data.message])
      .then(io.emit('RECEIVE_MESSAGE'))
      .catch((err) => {
        console.log(`Error in messaging with query ${sqlText}`, err);
      });
  });
});

// GET route to retrieve message history from the database
router.get('/', (req, res) => {
  const sqlText = `SELECT * FROM "messaging" WHERE "users_id" = $1;`;
  pool
    .query(sqlText, [req.user.id])
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log(`Error in GET with query ${sqlText}`, err);
      res.sendStatus(500);
    });
});

module.exports = router;
