const express = require('express');
const router = express.Router();
const myDebbuger = require('debug')('route:aplication');
//routes
router.get('/api', (req, res, next) => {
  const color = req.query.color;
  myDebbuger('color: ', color);
  const io = req.app.get('socketio');
  myDebbuger('io: ', io);
  res.send('result true')
  io.emit('change color', color)
  io.on('disconnect', () => {
    myDebbuger('user disconnected')
  })
})

module.exports = router;
