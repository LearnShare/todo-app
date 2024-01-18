import JWT from 'jsonwebtoken';
import {
  Request,
  Response,
  NextFunction,
} from 'express';

function encrypt(data) {
  return JWT.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
}

/* function decrypt(token) {
  return JWT.verify(token, JWT_SECRET);
} */

function check(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.get('Authorization');
  const token = authHeader
      && authHeader.split(' ')[1];
  if (!authHeader
      || !token) {
    res.status(403)
      .end('you should login first');
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, data) => {
    if (error) {
      console.log(error);
      res.status(403)
        .end('invalid token');
    } else {
      req.user = data;

      next();
    }
  });
}

export default {
  encrypt,
  // decrypt,
  check,
};
