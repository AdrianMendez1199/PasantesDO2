const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res) => {
  const { body } = req;
  try {
    const userLogin = await User.findOne({ email: body.email });

    if (!userLogin) {
      return res.status(400).json({
        ok: false,
        message: 'usuario o clave incorrecto',
      });
    }

    if (userLogin.status == 'PEND') {
      return res.status(200).json({
        ok: false,
        message: 'pendiente Validacion',
      });
    }

    if (!await bcrypt.compareSync(body.password, userLogin.password)) {
      return res.status(401).json({
        ok: false,
        message: 'usuario o clave incorrecto',
      });
    }
    const token = jwt.sign({
      user: userLogin,
    }, process.env.SEED, { expiresIn: '1h' });

    return res.status(200).json({
      ok: true,
      userLogin,
      token,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      err,
    });
  }
};


module.exports = {
  auth,
};
