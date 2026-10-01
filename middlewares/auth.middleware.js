import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'No llegó ningún token en los headers' });
  }

  const token = authHeader.split(' ')[1];

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// Corre después de verifyToken: usa req.user, no vuelve a leer el token
export const verifyAdmin = (req, res, next) => {
  if (req.user.rol !== 'A') {
    return res.status(403).json({ message: 'Sólo un admin puede hacer esto' });
  }
  next();
};