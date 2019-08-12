import express from 'express';

import login from '../controllers/login';

const router = express.Router();


router.post('/', login.auth);

module.exports = router;
