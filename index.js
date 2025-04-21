const express = require('express');
const cors = require('cors');

const app = express();
require('dotenv').config();
require('./config/db')();

app.use(cors());
app.use(express.json());

app.listen(8000, () => {
    console.log('Server is running.');
});