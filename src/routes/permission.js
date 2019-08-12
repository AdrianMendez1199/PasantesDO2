import express from 'express';
import permission from '../controllers/permission';
import { verifyToken, verifyAdminRole } from '../middlewares/authentication';

const router = express.Router();


router.post('/create', [verifyToken, verifyAdminRole], permission.createPermission)
  .get('/', [verifyToken, verifyAdminRole], permission.getPermissions);

module.exports = router;
