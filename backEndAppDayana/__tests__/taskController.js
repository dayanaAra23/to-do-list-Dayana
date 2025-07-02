const httpMocks = require('node-mocks-http');
const taskController = require('../src/controllers/taskController');
const taskService = require('../src/services/taskService');

jest.mock('../src/services/taskService'); 

describe('taskController.getTasks', () => {
  it('should return a list of tasks with success', async () => {
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

});