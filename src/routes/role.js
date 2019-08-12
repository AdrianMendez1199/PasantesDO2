import express from 'express';

import Role  from '../controllers/role'; 

const router = express.Router();


router.post('/create', Role.createRole)
  .get('/', Role.getRoles);

module.exports = router;
