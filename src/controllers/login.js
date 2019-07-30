// const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const auth = async (req, res) => {
  const { body } = req;
  try {
    const userLogin = await User.findOne({ email: body.email });

    if (!userLogin) {
      res.status(400).json({
        ok: false,
        message: '(usuario) o clave incorrecto',
      });
    }
    if (!await bcrypt.compareSync(body.password, userLogin.password)) {
      res.status(401).json({
        ok: false,
        message: 'usuario o (clave) incorrecto',
      });
    }
    let token = jwt.sign({
      payload: userLogin,
    }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

    res.status(200).json({
      ok: true,
      userLogin,
      token
    });

  } catch (err) {
    res.status(500).json({
      ok: false,
      err,
    });
  }
};


module.exports = {
  auth,
};
