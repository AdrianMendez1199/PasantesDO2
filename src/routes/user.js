const express = require('express');

const router = express.Router();


const userController = require('../controllers/user');

router.get('/', userController.getUsers)
  .post('/create', userController.createUser)
  .put('/edit/:id', userController.editUser)
  .delete('/delete/:id', userController.deleteUser);


module.exports = router;
