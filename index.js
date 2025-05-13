const express = require('express');
const cors = require('cors');
const path = require('path');

const runnerRouter = require('./routes/runner');
const userRouter = require('./routes/user');
const swaggerRouter = require('./routes/swagger');

const app = express();
require('dotenv').config();
require('./config/db')();

app.use(cors());
app.use(express.json());

app.use('/', runnerRouter);
app.use('/', userRouter);
app.use('/', swaggerRouter);

app.use(express.static(path.join(__dirname, 'build')));
app.get(/^\/(?!api-docs).*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(8000, () => {
    console.log('Server is running.');
});