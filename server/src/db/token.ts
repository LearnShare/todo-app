import prisma from "./prisma";

const db = prisma.token;

// search single Token
function get(query) {
  return db.findUnique({
    where: query,
  });
}

// create Token
function create({
  token,
  type,
  ref,
  etime,
}) {
  return db.create({
    data: {
      token,
      type,
      ref,
      etime,
    },
  });
}

export default {
  get,
  create,
};
