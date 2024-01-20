import prisma from "./prisma";

const db = prisma.token;

// search single Token
function get(query) {
  return db.findMany({
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

// update token
function update(id, data) {
  return db.update({
    where: {
      id,
    },
    data,
  });
}

export default {
  get,
  create,
  update,
};
