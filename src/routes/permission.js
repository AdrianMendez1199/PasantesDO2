const express = require('express');

const router = express.Router();

const permission = require('../controllers/permission');

const { verifyToken, verifyAdminRole } = require('../middlewares/authentication');

router.post('/create', [ verifyToken, verifyAdminRole ], permission.createPermission)
      .get('/', [ verifyToken, verifyAdminRole ], permission.getPermissions);

module.exports = router;




