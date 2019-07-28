const express = require('express');
const bodyParser = require('body-parser');

require('./config/config');
require('./config/database');

const user = require('./routes/user');
const role = require('./routes/role');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', user);
app.use('/role', role);

app.listen(7000, () => {
    console.log('El servidor esta corriendo en el puerto 3000');
});