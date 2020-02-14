import express from 'express';

import {
  getUsers, confirmationUser, createUser, editUser, deleteUser,
} from '../controllers/user';


import { verifyToken, verifyAdminRole } from '../middlewares/authentication';

const router = express.Router();

router.get('/users', [verifyToken, verifyAdminRole], getUsers)
  .get('/confirmation/:token', confirmationUser)
  .post('/create', createUser)
  .put('/edit/:id', [verifyToken, verifyAdminRole], editUser)
  .delete('/delete/:id', [verifyToken, verifyAdminRole], deleteUser);


export default router;
