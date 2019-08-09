const express = require('express');

const router = express.Router();

const permission = require('../controllers/permission');

const { verifyToken, verifyRole } = require('../middlewares/authentication');

router.post('/create', [ verifyToken, verifyRole ], permission.createPermission)
      .get('/', [ verifyToken, verifyRole ], permission.getPermissions);

module.exports = router;




