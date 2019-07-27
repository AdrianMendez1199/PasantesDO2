const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('./config/config');

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




app.listen(process.env.PORT, () => {
    console.log(`El servidor esta corriendo en el puerto 3000`);
})