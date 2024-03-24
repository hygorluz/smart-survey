const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).send('Unauthorized');
    }

      req.user = decoded;
      next();
    }
  );
}