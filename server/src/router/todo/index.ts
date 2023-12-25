import {
  Router,
} from 'express';

import DB from '@/db';

const todoRouter = Router();

// get todos
todoRouter.get('/', async (req: Request, res: Response) => {
  const list = await DB.todo.list({
    // size: Number(req.query.size)
    //   || 10,
    // page: Number(req.query.page)
    //   || 1,
  });

  res.json(list);
});

// get todo
todoRouter.get(`/:id`, async (req: Request, res: Response) => {
  const {
    id,
  } = req.params;
  const todo = await DB.todo.get({
    id: Number(id),
  });

  if (!todo) {
    res.status(404)
        .end();
  } else {
    res.json(todo);
  }
});

// create todo
todoRouter.post('/', async (req: Request, res: Response) => {
  const {
    text,
  } = req.body;

  const todo = await DB.todo.create({
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
