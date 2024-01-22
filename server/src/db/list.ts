import prisma from "./prisma";

const db = prisma.list;

const todoFilter = {
  select: {
    id: true,
    text: true,
    done: true,
    ctime: true,
  },
};

// search Lists
function search(
  size = 10,
  page = 1,
  query,
) {
  return db.findMany({
    skip: size * (page - 1),
    take: size,
    where: query,
    orderBy: {
      ctime: 'desc',
    },
  });
}

// get List by ID
function get({
  id,
}) {
  return db.findUnique({
    where: {
      id,
    },
  });
}

// create List
function create({
  name,
  user,
}) {
  return db.create({
    data: {
      name,
      user,
    },
  });
}

// update List
function update({
  id,
  name,
}) {
  return db.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
}

// delete List
function remove({
  id,
}) {
  return db.delete({
    where: {
      id,
    },
  });
}

export default {
  search,
  get,
  create,
  update,
  remove,
};
