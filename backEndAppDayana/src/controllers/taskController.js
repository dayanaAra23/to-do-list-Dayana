const taskService = require('../services/taskService');

const getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTasks(req.query || {});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tarefas' });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await taskService.createTask({
      taskName: req.body.taskName,
      dueDate: new Date(req.body.dueDate),
      description: req.body.description,
      label: req.body.label
    });
    res.status(201).json(task);
  } catch (error) {
    if (error.code === 'P2002') {
      res.status(409).json({ message: 'Task name is already in use' });
    } else {
      res.status(500).json({ message: 'Erro interno', detalhes: error.message });
    }
  }
};

const toggleTask = async (req, res) => {
  try {
    const task = await taskService.toggleTask(req.params.id, req.body.completed);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar tarefa', detalhes: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    await taskService.deleteTask(req.params.id);
    res.status(200).json({ deleted: true });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar tarefa', detalhes: error.message });
  }
};

module.exports = { getTasks, createTask, toggleTask, deleteTask };