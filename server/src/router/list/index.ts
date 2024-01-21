import {
  Router,
  Request,
  Response,
} from 'express';

import DB from '@/db';

const listRouter = Router();

// get lists
listRouter.get('/', async (req: Request, res: Response) => {
  const {
    size = 10,
    page = 1,
  } = req.query;
  const {
    id: userId,
  } = req.user;

  const list = await DB.list.list(
    Number(size),
    Number(page),
    {
      user: userId,
    },
  );

  res.json(list);
});

// get List
listRouter.get(`/:id`, async (req: Request, res: Response) => {
  const {
    id,
  } = req.params;
  const {
    id: userId,
  } = req.user;

  const list = await DB.list.get({
    id: Number(id),
  });

  if (!list) {
    res.status(404)
      .end('List not exist');
    return;
  } else if (list.user !== Number(userId)) {
    res.status(403)
      .end('Not visible');
    return;
  }

  res.json(list);
});

// create List
listRouter.post('/', async (req: Request, res: Response) => {
  const {
    name,
  } = req.body;
  const {
    id: userId,
  } = req.user;

  const list = await DB.list.create({
    name,
    user: userId,
  });

  res.json(list);
});

// update List
listRouter.put(`/:id`, async (req: Request, res: Response) => {
  const {
    id,
  } = req.params;
  const {
    name,
  } = req.body;

  if (!name) {
    res.status(400)
      .end('Invalid List data');
    return;
  }

  const target = await DB.list.get({
    id: Number(id),
  });

  if (!target) {
    res.status(404)
      .end('List not exist');
    return;
  }

  const list = await DB.list.update({
    id: Number(id),
    name,
  });

  res.json(list);
});

// delete List
listRouter.delete(`/:id`, async (req: Request, res: Response) => {
  const {
    id,
  } = req.params;

  const target = await DB.list.get({
    id: Number(id),
  });

  if (!target) {
    res.status(404)
        .end('List not exist');
    return;
  }

  await DB.list.remove({
    id: Number(id),
  });

  res.end();
});

export default listRouter;
