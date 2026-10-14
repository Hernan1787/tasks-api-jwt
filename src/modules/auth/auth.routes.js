import { Router } from 'express';
import { supabase } from '../../lib/supabase.js';
import { validate } from '../../middlewares/validate.js';
import { requireAuth } from '../../middlewares/auth.js';
import { createUsersRepository } from './users.repository.js';
import { createAuthService } from './auth.service.js';
import { createAuthController } from './auth.controller.js';
import { credentialsSchema } from './auth.schema.js';

// Composition root del módulo: repository -> service -> controller.
const service = createAuthService(createUsersRepository(supabase));
const controller = createAuthController(service);

export const authRouter = Router();

authRouter.post('/register', validate(credentialsSchema), controller.register);
authRouter.post('/login', validate(credentialsSchema), controller.login);
authRouter.get('/me', requireAuth, controller.me);
