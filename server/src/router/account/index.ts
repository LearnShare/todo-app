import {
  Router,
  Request,
  Response,
} from 'express';

import DB from '@/db';
import Validator from '@/lib/validator';
import Crypto from '@/lib/crypto';
import Email from '@/lib/email';
import Auth from '@/lib/auth';
import Config from '@/config';

const accountRouter = Router();

// sign-in
accountRouter.post('/sign-in', async (req: Request, res: Response) => {
  const {
    username,
    password,
  } = req.body;

  if (!username
      || !password) {
    res.status(400)
      .end('username and password required.');
    return;
  }

  const users = await DB.user.search({
    username,
  });
  if (!users.length) {
    res.status(400)
      .end('invalid username or password.');
    return;
  }

  const {
    id,
    password: hash,
    status,
  } = users[0];

  const match = await Crypto.checkPassword(password, hash);
  if (!match) {
    res.status(400)
      .end('invalid username or password.');
      return;
  }

  const token = await Auth.encrypt({
    id,
  });

  res.json({
    id,
    username,
    status,
    token,
  });
});

// get Account info
accountRouter.get('/info', Auth.check, async (req: Request, res: Response) => {
  console.log(req.user);
  const {
    id,
  } = req.user;

  const user = await DB.user.get({
    id,
  });
  const {
    username,
    status,
  } = user;

  res.json({
    id,
    username,
    status,
  });
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
  const hash = await Crypto.hashPassword(password);
  const user = await DB.user.create({
    username,
    password: hash,
    status: 'inactive',
  });

  // 4. send active code
  const code = Crypto.generateRandomNumber(6);
  const token = await DB.token.create({
    token: code,
    type: 'account-active',
    ref: user.id,
    ctime: new Date(),
    etime: new Date(Date.now() + Config.accountActiveTokenETime),
  });
  await Email.send(username, code, 'account-active');

  const {
    id,
    status,
  } = user;

  res.json({
    id,
    username,
    status,
  });
});

// send verify token/code
accountRouter.post('/verify', Auth.check, async (req: Request, res: Response) => {
  const {
    type, // sign-in | password
  } = req.body;

  // TODO
  // 1. send active token/code

  res.end();
});

// active Account
accountRouter.post('/active', Auth.check, async (req: Request, res: Response) => {
  const {
    code,
  } = req.body;
  const {
    id,
  } = req.user;

  const tokens = await DB.token.get({
    ref: id,
    type: 'account-active',
  });
  if (!tokens) { // no matched token
    res.status(400)
      .end('invalid activation code');
    return;
  }

  const {
    id: tokenId,
    token,
    used,
    etime,
  } = tokens[0];
  if (used) { // token used
    res.status(200)
      .end('account already activated');
    return;
  }
  if (Date.now() > new Date(etime).getTime() // token expired
      || code !== token) { // token not match
    res.status(400)
      .end('invalid activation code');
    return;
  }

  await DB.token.update(tokenId, {
    used: true,
  });
  const user = await DB.user.update(id, {
    status: 'active',
  });

  const {
    username,
    status,
  } = user;

  res.json({
    id,
    username,
    status,
  });
});

// update Account
// password
// profile
// preference

export default accountRouter;
