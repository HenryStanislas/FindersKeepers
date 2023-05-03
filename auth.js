const jwt = require('jsonwebtoken');

function generateToken(user) {
  const token = jwt.sign({ id: user._id, username: user.username }, 'secretKey', { expiresIn: '1h' });
  return token;
}

function verifyToken(token) {
    try {
      const decoded = jwt.verify(token, 'secretKey');
      return decoded;
    } catch (err) {
      return null;
    }
  }

