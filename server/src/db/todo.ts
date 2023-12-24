import {
  PrismaClient,
} from '@prisma/client';

const prisma = new PrismaClient();
const db = prisma.todo;

// get todos
function list({
  size,
  page,
}) {
  return db.findMany({
    skip: size * (page - 1),
    take: size,
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

export default {
  list,
  get,
  create,
};
