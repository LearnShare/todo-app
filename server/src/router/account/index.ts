import {
  Router,
  Request,
  Response,
} from 'express';

import DB from '@/db';
import Validator from '@/lib/validator';
import Crypto from '@/lib/crypto';
import Email from '@/lib/email';
import Config from '@/config';

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

  if (!Validator.isEmail(username)) {
    res.status(400)
      .end('Invalid email');
    return;
  }

  // 2. check is exists
  const exist = await DB.user.search({
    username,
  });
  if (exist.length) {
    res.status(400)
      .end('Account already exists');
    return;
  }

  // 3. create user
  const account = await DB.user.create({
    username,
    password,
    status: 'inactive',
  });
  console.log(account);

  // 4. send active code
  const code = Crypto.generateRandomNumber(6);
  console.log(code);
  const token = await DB.token.create({
    token: code,
    type: 'account-active',
    ref: account.id,
    ctime: new Date(),
    etime: new Date(Date.now() + Config.accountActiveTokenETime),
  });
  console.log(token);
  await Email.send(username, code, 'account-active');

  res.json(account);
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
