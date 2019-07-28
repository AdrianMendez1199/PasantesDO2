const express = require('express');

const router = express.Router();

const Role = require('../controllers/role');

router.post('/create', Role.createRole)
  .get('/', Role.getRoles);

module.exports = router;
