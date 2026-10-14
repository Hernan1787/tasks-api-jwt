import { Router } from 'express';
import { docsRouter } from './docs/docs.routes.js';
import { authRouter } from './modules/auth/auth.routes.js';
import { healthRouter } from './modules/health/health.routes.js';
import { tasksRouter } from './modules/tasks/tasks.routes.js';

export const apiRouter = Router();

apiRouter.use('/docs', docsRouter);
apiRouter.use('/health', healthRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/tasks', tasksRouter);
