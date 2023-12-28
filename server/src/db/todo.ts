import prisma from "./prisma";

const db = prisma.todo;

// get todos
function list({
  // size,
  // page,
}) {
  return db.findMany({
    // skip: size * (page - 1),
    // take: size,
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
  text,
}) {
  return db.create({
    data: {
      text,
    },
  });
}

// udpate todo
function update({
  id,
  text,
  done,
}) {
  return db.update({
    where: {
      id,
    },
    data: {
      text,
      done,
    },
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
  list,
  get,
  create,
  update,
  remove,
};
