const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ message: 'Access denied. No token provided.' });

  // Split the token to remove 'Bearer ' part
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied. Invalid token format.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    req.user = decoded;
    console.log("r >", req.user, "dec >", decoded)
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
