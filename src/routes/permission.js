import express from 'express';
import { createPermission, getPermissions } from '../controllers/permission';
import { verifyToken, verifyAdminRole } from '../middlewares/authentication';

const router = express.Router();


router.post('/create', [verifyToken, verifyAdminRole], createPermission)
  .get('/', [verifyToken, verifyAdminRole], getPermissions);

export default router;
