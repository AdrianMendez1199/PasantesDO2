import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

import User from '../models/user';

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

    if (userLogin.status === 'PEND') {
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


/**
 *
 * @param {string} token
 */

const verifyGoogleToken = async (token) => {
  const client = new OAuth2Client(process.env.CLIENT_ID);

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const payload = ticket.getPayload();

  return {
    name: payload.name,
    email: payload.email,
    img: payload.picture,
    google: true,
  };
};


/**
*
* @param {Request} req
* @param {response} res
*/

const authGoogle = async (req, res) => {
  let token = req.body.idtoken;
  try {
    const googleUser = await verifyGoogleToken(token);

    const userDB = await User.findOne({ email: googleUser.email });

    if (!userDB) {
      const newUser = new User({
        name: googleUser.name,
        email: googleUser.email,
        img: googleUser.img,
        google: googleUser.google,
        status: 'A',
        password: ':)',
      });

      const user = await newUser.save();

      return res.status(201).json({
        ok: true,
        user,
      });
    }

    if (userDB.google === false) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'debe usar su authenticacion normal',
        },
      });
    }

    token = jwt.sign({
      user: userDB,
    }, process.env.SEED, { expiresIn: '1h' });


    return res.status(200).json({
      ok: true,
      userDB,
      token,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      err,
    });
  }
};

export { auth, authGoogle };
