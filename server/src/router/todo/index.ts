import {
  Router,
  Request,
  Response,
} from 'express';

import DB from '@/db';

const todoRouter = Router();

// create todo
todoRouter.post('/', async (req: Request, res: Response) => {
  const {
    listId,
    text,
  } = req.body;
  const {
    id: userId,
  } = req.user;

  if (!text
      || !listId) {
    res.status(400)
      .end('Invalid data');
    return;
  }

  const list = await DB.list.get({
    id: Number(listId),
  });

  if (!list) {
    res.status(404)
      .end('List not exist');
    return;
  }
  if (list.user !== userId) {
    res.status(403)
      .end('Not available');
    return;
  }

  const todo = await DB.todo.create({
    list: Number(listId),
    user: userId,
    text,
    done: false,
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
  const {
    id: userId,
  } = req.user;

  if (!text
      || done === undefined) {
    res.status(400)
      .end('Invalid todo data');
    return;
  }

  const target = await DB.todo.get({
    id: Number(id),
  });

  if (!target) {
    res.status(404)
      .end('Todo not exist');
    return;
  }
  if (target.user !== userId) {
    res.status(403)
      .end('Not available');
    return;
  }

  const todo = await DB.todo.update(Number(id), {
    text,
    done: Boolean(done),
  });

  res.json(todo);
});

// delete todo
todoRouter.delete(`/:id`, async (req: Request, res: Response) => {
  const {
    id,
  } = req.params;

  const target = await DB.todo.get({
    id: Number(id),
  });

  if (!target) {
    res.status(404)
      .end('Todo not exist');
    return;
  }

  await DB.todo.remove({
    id: Number(id),
  });

  res.end();
});

export default todoRouter;
