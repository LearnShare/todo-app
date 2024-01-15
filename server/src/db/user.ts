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

// update User
function update({
  id,
  password,
  status,
  // profile,
  // preference,
}) {
  return db.update({
    where: {
      id,
    },
    data: {
      password,
      status,
    },
  });
}

export default {
  list,
  get,
  update,
};
