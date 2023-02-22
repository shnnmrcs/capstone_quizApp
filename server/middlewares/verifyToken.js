const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
module.exports = function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Unauthorized, Missing header token' });
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
      if (error) {
        res.status(401).json({ error: 'Invalid token' });
      } else {
        req.userId = decoded.userId;
        next();
      }
    });
  }
};
