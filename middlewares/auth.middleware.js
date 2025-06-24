import { verifyToken } from '../lib/jwt.js';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decodedToken = verifyToken(token);
      req.user = decodedToken;
    } catch (error) {
      req.user = null;
    }
  } else {
    req.user = null;
  }
  next();
}