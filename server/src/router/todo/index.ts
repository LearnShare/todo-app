import {
  Router,
} from 'express';

const todoRouter = Router();

todoRouter.get('/', (req: Request, res: Response) => {
  res.send('todo-1');
});

export default todoRouter;
