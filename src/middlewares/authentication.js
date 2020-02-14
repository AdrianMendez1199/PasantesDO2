import jwt from 'jsonwebtoken';


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
    return next();
  });
};

// ========================
// verify Rol
// ========================

const verifyAdminRole = (req, res, next) => {
  const { user } = req;
  if (user.role === 'ADMIN_ROLE') {
    return next();
  }

  return res.status(403).json({
    ok: false,
    err: {
      message: 'Not auth',
    },
  });
};


export { verifyAdminRole, verifyToken };
