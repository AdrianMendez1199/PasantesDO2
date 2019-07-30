const express = require('express');

const router = express.Router();


const userController = require('../controllers/user');

const { verifyToken } = require('../middlewares/authentication');

router.get('/', verifyToken, userController.getUsers)
  .post('/create', userController.createUser)
  .put('/edit/:id', userController.editUser)
  .delete('/delete/:id', userController.deleteUser);


module.exports = router;
