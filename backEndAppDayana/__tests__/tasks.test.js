const request = require('supertest');
const { mockDeep } = require('jest-mock-extended');

// 💡 Crie o mock antes de tudo
const mockPrisma = mockDeep();

// 👇 Agora pode mockar o PrismaClient usando o mock acima
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => mockPrisma),
}));

// Só depois importe o app
const app = require('../server');

describe('Testes com Prisma mockado', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // limpa o mock a cada teste
  });

  it('deve retornar uma tarefa mockada', async () => {
    mockPrisma.task.findMany.mockResolvedValue([
      { id: '123', taskName: 'Tarefa mockada', completed: false, label: 'professional', description: 'dayana test', dueDate: '2025-06-24T00:00:00.000Z' },
    ]);

    const res = await request(app).get('/tasks');

    expect(res.status).toBe(200);
    expect(res.body[0].taskName).toBe('Tarefa mockada');
  });

  it('deve retornar várias tarefas mockadas', async () => {
    mockPrisma.task.findMany.mockResolvedValue([
      { id: '123', taskName: 'Tarefa mockada', completed: false, label: 'personal', description: 'dayana test', dueDate: '2025-06-24T00:00:00.000Z' },
      { id: '124', taskName: 'Tarefa mockada 2', completed: true },
      { id: '225', taskName: 'Tarefa mockada 3', completed: false },
    ]);

    const res = await request(app).get('/tasks');

    expect(res.status).toBe(200);
    expect(res.body[0].taskName).toBe('Tarefa mockada');
    expect(res.body[1].taskName).toBe('Tarefa mockada 2');
    expect(res.body[2].taskName).toBe('Tarefa mockada 3');
  });

  it('deve retornar uma lista vazia se não houver tarefas', async () => {
    mockPrisma.task.findMany.mockResolvedValue([]);

    const res = await request(app).get('/tasks');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('deve passar ao esperar uma tarefa com nome diferente da criada', async () => {
    mockPrisma.task.findMany.mockResolvedValue([
      { id: '999', taskName: 'Outra tarefa', completed: false },
    ]);

    const res = await request(app).get('/tasks');

    // Simulando assert incorreto propositalmente
    expect(res.status).toBe(200); // ← esse deve passar
    expect(res.body[0].taskName).not.toBe('Tarefa mockada'); // ← esse deve falhar
  });

});
