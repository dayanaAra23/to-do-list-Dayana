const prisma = require('../../prisma/client');

const getTasks = async (filters = {}) => {
  return await prisma.task.findMany({
    where: filters,
    orderBy: { dueDate: 'asc' }
  });
};

const createTask = async (data) => {
  return await prisma.task.create({ data });
};

const toggleTask = async (id, completed) => {
  return await prisma.task.update({
    where: { id },
    data: { completed }
  });
};

const deleteTask = async (id) => {
  return await prisma.task.delete({
    where: { id }
  });
};

module.exports = { getTasks, createTask, toggleTask, deleteTask };