import Role from '../models/role';

const getRoles = (req, res) => {
  Role.find({ status: true })
    .then((role) => {
      res.status(200).json({
        ok: true,
        role,
      });
    }).catch((err) => {
      res.status(400).json({
        ok: false,
        err,
      });
    });
};


const createRole = (req, res) => {
  const { body } = req;

  const role = new Role({
    name: body.name,
    description: body.description,
  });

  role.save()
    .then((resp) => {
      res.status(200).json({
        ok: true,
        role: resp,
      });
    }).catch((err) => {
      res.status(400).json({
        ok: false,
        err,
      });
    });
};

export { createRole, getRoles };
