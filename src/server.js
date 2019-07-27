const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('./config/config');
require('./config/database');

const user = require('./routes/user');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', user);

app.listen(7000, () => {
  console.log('El servidor esta corriendo en el puerto 3000');
});
