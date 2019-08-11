const express = require('express');

const router = express.Router();


const userController = require('../controllers/user');

const { verifyToken, verifyAdminRole } = require('../middlewares/authentication');

router.get('/users', [verifyToken, verifyAdminRole], userController.getUsers)
  .get('/confirmation/:token', userController.confirmationUser)
  .post('/create', userController.createUser)
  .put('/edit/:id', [verifyToken, verifyAdminRole], userController.editUser)
  .delete('/delete/:id', [verifyToken, verifyAdminRole], userController.deleteUser);


module.exports = router;
