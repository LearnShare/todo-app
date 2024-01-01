import {
  Router,
  Request,
  Response,
} from 'express';

import listRouter from './list';
import todoRouter from './todo';

const router = Router();

router.use('/api/list', listRouter);
router.use('/api/todo', todoRouter);

router.all('*', (req: Request, res: Response) => {
  res.status(404)
    .send(`${ req.path } - not found.`);
});

export default router;
