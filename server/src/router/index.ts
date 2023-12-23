import {
  Router,
  Request,
  Response,
} from 'express';

import todoRouter from './todo'

const router = Router();

router.use('/todo', todoRouter);

router.all('*', (req: Request, res: Response) => {
  res.status(404)
    .send(`${ req.path } - not found.`);
});

export default router;
