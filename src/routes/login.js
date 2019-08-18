import express from 'express';

import { auth, authGoogle } from '../controllers/login';

const router = express.Router();


router.post('/', auth)
  .post('/google', authGoogle);

export default router;
