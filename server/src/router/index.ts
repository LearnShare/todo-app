import {
  Router,
  Request,
  Response,
} from 'express';

import accountRouter from './account';
import listRouter from './list';
import todoRouter from './todo';
import fileRouter from './file';

const router = Router();

// TODO JWT token
router.use('/api/account', accountRouter);
router.use('/api/list', listRouter);
router.use('/api/todo', todoRouter);
router.use('/api/file', fileRouter);

router.all('*', (req: Request, res: Response) => {
  res.status(404)
    .send(`${ req.path } - not found.`);
});

export default router;
