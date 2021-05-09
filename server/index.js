const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
const cors = require('cors');
const userRouter = require('./routers/user');
require('./db');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '../build')));
app.use(express.json());
app.use(userRouter);

app.use('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../build', 'index.html'))
);

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
