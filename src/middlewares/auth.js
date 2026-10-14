import { verifyToken } from '../lib/jwt.js';
import { HttpError } from '../utils/http-error.js';

// Verifica el JWT antes de llegar al controller. Si es válido, deja el usuario en req.user.
export function requireAuth(req, _res, next) {
  const [scheme, token] = (req.get('authorization') ?? '').split(' ');
  if (scheme !== 'Bearer' || !token) {
    throw HttpError.unauthorized('Falta el header Authorization: Bearer <token>');
  }

  try {
    const payload = verifyToken(token);
    req.user = { id: payload.sub, email: payload.email };
  } catch {
    throw HttpError.unauthorized('Token inválido o expirado');
  }
  next();
}
