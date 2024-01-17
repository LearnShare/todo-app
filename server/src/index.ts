import express, {
  Express,
  Request,
  Response,
} from 'express';

// FIXME .env.local not loaded

import router from '@/router';

const app: Express = express();
const port: number = 3000;

// JSON body parser
app.use(express.json());
// router modules
app.use(router);

app.listen(port, () => {
  console.log(`Express server running, port: ${ port }`);
});
