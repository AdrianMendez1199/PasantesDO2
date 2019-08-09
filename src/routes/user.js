const express = require('express');

const router = express.Router();


const userController = require('../controllers/user');

const { verifyToken, verifyRole } = require('../middlewares/authentication');

router.get('/', [verifyToken, verifyRole], userController.getUsers)
  .post('/create', userController.createUser)
  .put('/edit/:id', verifyToken, userController.editUser)
  .delete('/delete/:id', verifyToken, userController.deleteUser);


module.exports = router;
