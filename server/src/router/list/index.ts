import {
  Router,
} from 'express';

import DB from '@/db';

const listRouter = Router();

// get lists
listRouter.get('/', async (req: Request, res: Response) => {
  const list = await DB.list.list({
    // size: Number(req.query.size)
    //   || 10,
    // page: Number(req.query.page)
    //   || 1,
  });

  res.json(list);
});

// get List
listRouter.get(`/:id`, async (req: Request, res: Response) => {
  const {
    id,
  } = req.params;
  const list = await DB.list.get({
    id: Number(id),
  });

  if (!list) {
    res.status(404)
        .end();
  } else {
    res.json(list);
  }
});

// create List
listRouter.post('/', async (req: Request, res: Response) => {
  const {
    name,
  } = req.body;

  const list = await DB.list.create({
    name,
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

  const target = await DB.list.get({
    id: Number(id),
  });

  if (!name) {
    res.status(400)
        .end('Invalid List data');
  } else if (!target) {
    res.status(404)
        .end('List not exist');
  } else {
    const list = await DB.list.update({
      id: Number(id),
      name,
    });

    res.json(list);
  }
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
  } else {
    await DB.list.remove({
      id: Number(id),
    });

    res.end();
  }
});

export default listRouter;
