import express from 'express';
import userController from '../controllers/user';

const router = express.Router();



import { verifyToken, verifyAdminRole } from'../middlewares/authentication';

router.get('/users', [verifyToken, verifyAdminRole], userController.getUsers)
  .get('/confirmation/:token', userController.confirmationUser)
  .post('/create', userController.createUser)
  .put('/edit/:id', [verifyToken, verifyAdminRole], userController.editUser)
  .delete('/delete/:id', [verifyToken, verifyAdminRole], userController.deleteUser);


module.exports = router;
