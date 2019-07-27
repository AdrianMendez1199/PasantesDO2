const User = require('../models/user');

const getUsers = (req, res) => {
    res.status(200).json({
        ok: true,
        user: 'hey',
    });
};


const createUser = (req, res) => {

};

const deleteUser = (req, res) => {

};

const editUser = (req, res) => {

};

const login = (req, res) => {

};

module.exports = {
    getUsers,
    createUser,
    deleteUser,
    editUser,
    login,
};