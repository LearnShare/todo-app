import {
  Router,
  Request,
  Response,
} from 'express';
import multer from 'multer';

import DB from '@/db';

const upload = multer({
  dest: 'uploads/',
});

const fileRouter = Router();

// upload file
fileRouter.post(
  '/',
  upload.single('avatar'),
  async (req: Request, res: Response) => {
    console.log(req.body);
    console.log(req.file);
    const {
      fieldname,
      originalname,
      mimetype,
      destination,
      filename,
      size,
    } = req.file;

    const file = await DB.file.create({
      type: 'avatar',
      user: 1,
      path: destination,
      name: fieldname,
      size,
      mimeType: mimetype,
      hash: filename,
      originalName: originalname,
    });

    res.json(file);
  },
);

export default fileRouter;
