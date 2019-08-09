const express = require('express');

const user = require('./user');
const role = require('./role');
const login = require('./login');

const app = express();

app.use('/user', user);
app.use('/role', role);
app.use('/login', login);

module.exports = app;
