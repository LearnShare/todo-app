import express, {
  Express,
  Request,
  Response,
} from 'express';

import router from '@/router';

const app: Express = express();
const port: number = 3000;

app.use(router);

app.listen(port, () => {
  console.log(`Express server running, port: ${ port }`);
});
