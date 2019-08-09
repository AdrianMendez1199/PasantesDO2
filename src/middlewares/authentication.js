const jwt = require('jsonwebtoken');

// ========================
// verify token
// ========================
const verifyToken = (req, res, next) => {
  const token = req.get('token');

  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: 'Invalid token',
        },
      });
    }
    req.user = decoded.user;
    next();
  });
};

// ========================
// verify Rol
// ========================

const verifyRole = (req, res, next) => {
  const { user } = req;
  next();
};

module.exports = {
  verifyToken,
  verifyRole,
};
