import bcrypt from 'bcrypt';
import _ from 'underscore';
import nodemailer from 'nodemailer';
import crypto from 'crypto';


import User from '../models/user';
import Token from '../models/tokenVerify';


const getUsers = async (req, res) => {
  try {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
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


const editUser = (req, res) => {
  const { id } = req.params;
  /* eslint no-underscore-dangle: 0 */
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
 * this funtion check token to user confirmation
 *
 * @param {Request} req
 * @param {Response} res
 */
const confirmationUser = async (req, res) => {
  try {
    const token = await Token.findOne({ token: req.params.token });

    /* eslint no-underscore-dangle: 0 */
    const userId = token._userId;

    if (!token) {
      return res.status(400).json({
        ok: false,
        message: 'We were unable to find a valid token. Your token my have expired.',
      });
    }

    const user = await User.findById({ userId });

    if (!user) {
      return res.status(400).json({
        ok: false,
        message: 'We were unable to find a user for this token.',
      });
    }

    if (user.status === 'A') {
      return res.status(400).json({
        ok: false,
        message: 'This user has already been verified.',
      });
    }

    user.status = 'A';
    await user.save();

    return res.status(200).json({
      ok: true,
      message: 'The account has been verified. Please log in.',
    });
  } catch (err) {
    return res.status(500).json({
      ok: true,
      err,
    });
  }
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {string} host
 * @param {Json} user
 * @param {Json} token
 */
const sendUserEmail = async (req, res, host, user, token) => {
  // Send the email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USERNAME_EMAIL,
      pass: process.env.PASS_EMAIL,
    },
  });
  const mailOptions = {
    from: 'no-reply@yourwebapplication.com',
    to: user.email,
    subject: 'Account Verification Token',
    text: `${'Hello Please verify your account by clicking the link: http:'}${host}/user/confirmation/${token.token}`,
  };


  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    return res.status(200).json({
      ok: true,
      user,
      message: 'correo enviado',
    });
  });
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
        /* eslint no-underscore-dangle: 0 */
        _userId: userSave._id,
        token: crypto.randomBytes(16).toString('hex'),
      });

      await token.save();

      const { host } = req.headers;

      await sendUserEmail(req, res, host, user, token);
    }
  } catch (err) {
    res.status(400).json({
      ok: false,
      err,
    });
  }
};


export {
  getUsers, createUser, deleteUser, editUser, confirmationUser,
};
