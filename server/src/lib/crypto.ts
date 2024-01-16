import Crypto from 'node:crypto';

function generateRandomNumber(length: number): string {
  const num = Crypto.webcrypto.getRandomValues(new Uint32Array(1));

  return String(num).substring(0, length);
}

export default {
  generateRandomNumber,
};
