// DEPRECATED - New one it's available in zeroper (tictactoe) server project

const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());

app.use('/login', (req, res) => {
  res.send({
    token: 'test_token_123',
    roles: [1,4]
  });
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));