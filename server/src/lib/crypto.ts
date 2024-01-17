import Crypto from 'node:crypto';

import Bcrypt from 'bcrypt';

function generateRandomNumber(length: number): string {
  const num = Crypto.webcrypto.getRandomValues(new Uint32Array(1));

  return String(num).substring(0, length);
}

function hashPassword(password) {
  const saltRounds = 12;

  return Bcrypt.hash(password, saltRounds);
}

function checkPassword(password, hash) {
  return Bcrypt.compare(password, hash);
}

export default {
  generateRandomNumber,
  hashPassword,
  checkPassword,
};
