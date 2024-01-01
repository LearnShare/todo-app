import {
  Router,
} from 'express';

import DB from '@/db';

const todoRouter = Router();

// create todo
todoRouter.post('/', async (req: Request, res: Response) => {
  // TODO check is list exists
  const {
    listId,
    text,
  } = req.body;

  const todo = await DB.todo.create({
    listId: Number(listId),
    text,
  });

  res.json(todo);
});

// update todo
todoRouter.put(`/:id`, async (req: Request, res: Response) => {
  const {
    id,
  } = req.params;
  const {
    text,
    done,
  } = req.body;

  const target = await DB.todo.get({
    id: Number(id),
  });

  if (!text
      || done === undefined) {
    res.status(400)
        .end('Invalid todo data');
  } else if (!target) {
    res.status(404)
        .end('Todo not exist');
  } else {
    const todo = await DB.todo.update({
      id: Number(id),
      text,
      done: Boolean(done),
    });

    res.json(todo);
  }
});

// delete todo
todoRouter.delete(`/:id`, async (req: Request, res: Response) => {
  // TODO check is Todo[id] exists
  const {
    id,
  } = req.params;

  const target = await DB.todo.get({
    id: Number(id),
  });

  if (!target) {
    res.status(404)
        .end('Todo not exist');
  } else {
    await DB.todo.remove({
      id: Number(id),
    });

    res.end();
  }
});

export default todoRouter;
