const regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/;

function isEmail(email: string): boolean {
  console.log(email, regEmail.test(email));
  return regEmail.test(email);
}

export default {
  isEmail,
};
