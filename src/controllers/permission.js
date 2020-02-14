import Permission from '../models/permission';

/* eslint no-underscore-dangle: 0 */
const createPermission = (req, res) => {
  const permission = new Permission({
    permission: req.body.permission,
    created_by: req.user._id,
    roles: req.body.roles,
  });

  permission.save()
    .then((result) => res.status(201).json({
      ok: true,
      permission: result,
    })).catch((err) => res.status(400).json({
      ok: false,
      err,
    }));
};

const getPermissions = (req, res) => {
  Permission.find({ status: true })
    .then((result) => res.status(201).json({
      ok: true,
      permission: result,
    })).catch((err) => res.status(400).json({
      ok: false,
      err,
    }));
};

export { createPermission, getPermissions };
