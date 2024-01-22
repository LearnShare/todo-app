import prisma from "./prisma";

const db = prisma.todo;

// search Todos
function search(
  // size = 10,
  // page = 1,
  query,
) {
  return db.findMany({
    // skip: size * (page - 1),
    // take: size,
    where: query,
    orderBy: {
      ctime: 'desc',
    },
  });
}

// get Todo by ID
function get({
  id,
}) {
  return db.findUnique({
    where: {
      id,
    },
  });
}

// create Todo
function create({
  list,
  user,
  text,
  done,
}) {
  return db.create({
    data: {
      list,
      user,
      text,
      done,
    },
  });
}

// udpate todo
function update(id, data) {
  return db.update({
    where: {
      id,
    },
    data,
  });
}

// delete todo
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
