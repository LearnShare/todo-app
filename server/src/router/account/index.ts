import {
  Router,
  Request,
  Response,
} from 'express';

import DB from '@/db';

const accountRouter = Router();

// sign-in
accountRouter.post('/sign-in', async (req: Request, res: Response) => {
  const {
    username,
    password,
  } = req.body;

  // TODO
  // 1. check username and password
  // 2. return account info

  res.end();
});

// get Account info
accountRouter.get('/info', async (req: Request, res: Response) => {
  // TODO
  // 1. return account info

  res.end();
});

// create Account
accountRouter.post('/sign-up', async (req: Request, res: Response) => {
  const {
    username,
    password,
  } = req.body;

  // TODO
  // 1. check username
  // 2. send active token/code
  const account = await DB.user.create({
    username,
    password,
    status: 'inactive',
  });

  res.end();
});

// verify
accountRouter.post('/verify', async (req: Request, res: Response) => {
  const {
    type, // sign-in | password
  } = req.body;

  // TODO
  // 1. send active token/code

  res.end();
});

// active Account
accountRouter.post('/active', async (req: Request, res: Response) => {
  const {
    code,
  } = req.body;

  // TODO
  // 1. check token and code
  // 2. update user.status

  res.end();
});

// update Account
// password
// profile
// preference

export default accountRouter;
