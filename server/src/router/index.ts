import {
  Router,
  Request,
  Response,
} from 'express';

import Auth from '@/lib/auth';

import accountRouter from './account';
import listRouter from './list';
import todoRouter from './todo';
import fileRouter from './file';

const router = Router();

// TODO JWT token
router.use('/api/account', accountRouter);
router.use('/api/list', Auth.check, listRouter);
router.use('/api/todo', Auth.check, todoRouter);
router.use('/api/file', Auth.check, fileRouter);

router.all('*', (req: Request, res: Response) => {
  res.status(404)
    .send(`${ req.path } - not found.`);
});

export default router;
