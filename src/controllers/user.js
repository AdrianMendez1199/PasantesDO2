const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 0;
    limite = Number(limite);

    const users = await User.find({ status: true })
      .skip(desde)
      .limit(limite);

    const count = await User.countDocuments({ status: true });
    res.status(200).json({
      ok: true,
      count,
      users,

    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      err,
    });
  }
};

const createUser = (req, res) => {
  const { body } = req;

  const user = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
  });

  user.save()
    .then((resp) => {
      res.status(200).json({
        ok: true,
        user: resp,
      });
    }).catch((err) => {
      res.status(400).json({
        ok: false,
        err,
      });
    });
};


const editUser = (req, res) => {
  const { id } = req.params;
  const body = _.pick(req.body, ['name', 'email', 'role', 'img']);

  const updateOptions = {
    new: true,
    runValidators: true,
    context: 'query',
  };

  User.findByIdAndUpdate(id, body, updateOptions)
    .then((userUpdated) => {
      res.status(200).json({
        ok: true,
        user: userUpdated,
      });
    }).catch((err) => {
      res.status(400).json({
        ok: false,
        err,
      });
    });
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  const updateOptions = {
    new: true,
    runValidators: true,
    context: 'query',
  };

  User.findByIdAndUpdate(id, { $set: { status: false } }, updateOptions)
    .then((userdelete) => {
      res.status(200).json({
        ok: true,
        user: userdelete,
      });
    }).catch((err) => {
      res.status(400).json({
        ok: false,
        err,
      });
    });
};

const getUser = (user) => {
  const getUser = User.findOne({user, status:true});

  if(getUser) {
    console.log(getUser);
  }

};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  editUser,
  getUser,
};
