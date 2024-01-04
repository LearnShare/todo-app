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

// get lists
function list({
  // size,
  // page,
}) {
  return db.findMany({
    // skip: size * (page - 1),
    // take: size,
    include: {
      todos: todoFilter,
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
    include: {
      todos: todoFilter,
    },
  });
}

// create List
function create({
  name,
}) {
  return db.create({
    data: {
      name,
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
  list,
  get,
  create,
  update,
  remove,
};
