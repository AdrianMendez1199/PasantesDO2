const express = require('express');

const user = require('./user');
const role = require('./role');
const login = require('./login');
const permission = require('./permission');

const app = express();

app.use('/user', user);
app.use('/role', role);
app.use('/login', login);
app.use('/permission', permission);

module.exports = app;
