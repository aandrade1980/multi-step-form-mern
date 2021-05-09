const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
const express = require('express');
const userRouter = require('./routers/user');
require('./db');

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.json());
app.use(userRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'build')));
}

app.use('*', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
