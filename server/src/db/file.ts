import prisma from "./prisma";

const db = prisma.file;

// get files
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

// get File by ID
function get({
  id,
}) {
  return db.findUnique({
    where: {
      id,
    },
  });
}

// create File
function create({
  type,
  user,
  path,
  name,
  size,
  mimeType,
  hash,
  originalName,
}) {
  return db.create({
    data: {
      type,
      user,
      path,
      name,
      size,
      mimeType,
      hash,
      originalName,
    },
  });
}

// update File
function update({
  id,
  name,
  path,
}) {
  return db.update({
    where: {
      id,
    },
    data: {
      name,
      path,
    },
  });
}

// delete File
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
