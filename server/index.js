require('dotenv').config();
const express = require('express');
const path = require('path');
const userRouter = require('./routers/user');
require('./db');

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.json());
app.use(userRouter);

app.get('/', (req, res) => res.send('<h2>This is from index.js</h2>'));

app.use((req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
