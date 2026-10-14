import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

// Único archivo que conoce la librería de JWT.
export function signToken(user) {
  return jwt.sign({ email: user.email }, env.JWT_SECRET, {
    subject: user.id,
    expiresIn: env.JWT_EXPIRES_IN,
  });
}

// Lanza una excepción si el token fue alterado, está mal formado o expiró.
export function verifyToken(token) {
  return jwt.verify(token, env.JWT_SECRET, { algorithms: ['HS256'] });
}
