import prisma from "./prisma";

const db = prisma.user;

// get users
function list({
  size,
  page,
}) {
  return db.findMany({
    skip: size * (page - 1),
    take: size,
    orderBy: {
      ctime: 'desc',
    },
  });
}

// get User by ID
function get({
  id,
}) {
  return db.findUnique({
    where: {
      id,
    },
  });
}

// search Users
function search(query) {
  return db.findMany({
    where: query,
  });
}

// create User
function create({
  username,
  password,
  status,
}) {
  return db.create({
    data: {
      username,
      password,
      status,
    },
  });
}

// update User
function update(id, data) {
  return db.update({
    where: {
      id,
    },
    data,
  });
}

export default {
  list,
  get,
  search,
  create,
  update,
};
