const Permission = require('../models/permission');
const userController = require('../controllers/user');

const createPermission = (req, res) => {

  const permission = new Permission({
    permission: req.body.permission,
    created_by: req.user._id,
    roles: req.body.roles
  });

  permission.save()
    .then((result) => {
      return res.status(201).json({
        ok: true,
        permission: result
      });
    }).catch((err) => {
      return res.status(400).json({
        ok: false,
        err
      });
    });

};

const getPermissions  = (req, res) => {
    Permission.find({status:true})
    .then((result) => {
      return res.status(201).json({
        ok: true,
        permission: result
      });
    }).catch((err) => {
      return res.status(400).json({
        ok: false,
        err
      });
    });
};


module.exports = {
  createPermission,
  getPermissions
};