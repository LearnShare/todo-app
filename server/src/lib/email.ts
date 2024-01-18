import Dotenv from 'dotenv';
import NodeMailer from 'nodemailer';

Dotenv.config({
  path: '.env',
});
Dotenv.config({
  path: '.env.local',
  override: true,
});

const mailer = NodeMailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  secureConnection: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnAuthorized: true,
  },
  // logger: true,
  // debug: true,
});

// mailer.verify((error) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('mailer works');
//   }
// });

async function send(to, content, type) {
  const mail = {
    from: `Todo <${ process.env.MAIL_USER }>`,
    to,
    subject: 'Todo account activation code',
    text: content,
    html: content,
  };

  const result = await mailer.sendMail(mail);

  // console.log(result);
  // TODO log email records
}

export default {
  send,
};
