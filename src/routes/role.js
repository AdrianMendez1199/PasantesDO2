import express from 'express';

import { createRole, getRoles } from '../controllers/role';

const router = express.Router();


router.post('/create', createRole)
  .get('/', getRoles);

export default router;
