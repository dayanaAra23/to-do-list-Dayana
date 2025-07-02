const httpMocks = require('node-mocks-http');
const taskController = require('../src/controllers/taskController');
const taskService = require('../src/services/taskService');

jest.mock('../src/services/taskService'); 

describe('taskController.getTasks', () => {
  it('deve retornar tarefas com status 200', async () => {
    const mockTasks = [
      { id: 1, taskName: 'Lavar louça' },
      { id: 2, taskName: 'Estudar testes unitários' }
    ];

    taskService.getTasks.mockResolvedValue(mockTasks);

    const req = httpMocks.createRequest({ method: 'GET' });
    const res = httpMocks.createResponse();
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();

    await taskController.getTasks(req, res);

    expect(taskService.getTasks).toHaveBeenCalledWith({});
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTasks);
  });

  it('deve retornar status 500 e mensagem de erro +', async () => {
    taskService.getTasks.mockRejectedValue(new Error('Falha simulada'));

    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();

    await taskController.getTasks(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao buscar tarefas' });
  });
});