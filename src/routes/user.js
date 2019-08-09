const express = require('express');

const router = express.Router();


const userController = require('../controllers/user');

const { verifyToken, verifyAdminRole } = require('../middlewares/authentication');

router.get('/users', [verifyToken, verifyAdminRole], userController.getUsers)
  .post('/create', userController.createUser)
  .put('/edit/:id', verifyToken, userController.editUser)
  .delete('/delete/:id', verifyToken, userController.deleteUser);


module.exports = router;
