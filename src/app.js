const express = require('express');
const app = express();

app.use('/', (req, res) => {
  res.send('here we go');
});

module.exports = app;