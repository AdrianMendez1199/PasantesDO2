const bcrypt = require('bcrypt');
const _ = require('underscore');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const User = require('../models/user');
const Token = require('../models/tokenVerify');

const getUsers = async (req, res) => {
  try {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 0;
    limite = Number(limite);

    const users = await User.find({ status: 'A' })
      .skip(desde)
      .limit(limite);

    const count = await User.countDocuments({ status: 'A' });
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

const createUser = async (req, res) => {
  try {
    const { body } = req;

    const user = new User({
      name: body.name,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10),
    });

    const userSave = await user.save();
    if (userSave) {
      const token = new Token({
        _userId: userSave._id,
        token: crypto.randomBytes(16).toString('hex'),
      });

      await token.save();

      // Send the email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'mendezadrian149@gmail.com',
          pass: '8492560038',
        },
      });
      const mailOptions = {
        from: 'no-reply@yourwebapplication.com',
        to: user.email,
        subject: 'Account Verification Token',
        text: `${'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/'}${req.headers.host}\/user\/confirmation\/${token.token}.\n`,
      };

      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            msg: err.message,
          });
        }

        return res.status(200).json({
          ok: true,
          user: userSave,
          message: `A verification email has been sent to ${user.email}.`,
        });
      });
    }
  } catch (err) {
    res.status(400).json({
      ok: false,
      err,
    });
  }
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

  User.findByIdAndUpdate(id, { $set: { status: 'I' } }, updateOptions)
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


/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const confirmationUser = async (req, res, next) => {
  try {
    const token = await Token.findOne({ token: req.params.token });

    if (!token) {
      return res.status(400).json({
        ok: false,
        message: 'We were unable to find a valid token. Your token my have expired.',
      });
    }

    const user = await User.findById({ _id: token._userId });

    if (!user) {
      return res.status(400).json({
        ok: false,
        message: 'We were unable to find a user for this token.',
      });
    }

    if (user.status == 'A') {
      return res.status(400).json({
        ok: false,
        message: 'This user has already been verified.',
      });
    }

    user.status = 'A';
    const userVerify = await user.save();

    if (userVerify) {
      return res.status(200).json({
        ok: true,
        message: 'The account has been verified. Please log in.',
      });
    }
  } catch (err) {
    return res.status(500).json({
      ok: true,
      err,
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  editUser,
  confirmationUser,
};
