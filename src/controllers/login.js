const mongoose = require('mongoose');

const User = require('../models/user');


const auth = (req, res) => {
    res.status(200).json({
        ok: true,
    });
};


module.exports = {
    auth
}