const request = require('supertest');
const app = require('../app');  // Importa o app para testar as rotas

describe('API de Usuários', () => {
  it('deve criar um novo usuário', async () => {
    const res = await request(app)
      .post('/api/usuarios')
      .send({
        nome: 'Usuário Exemplo',
        email: 'usuario@exemplo.com',
        telefone: '123456789'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('deve listar todos os usuários', async () => {
    const res = await request(app).get('/api/usuarios');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('deve atualizar um usuário', async () => {
    const res = await request(app)
      .put('/api/usuarios/1')
      .send({ nome: 'Usuário Atualizado', email: 'atualizado@exemplo.com' });
    expect(res.statusCode).toEqual(200);
  });

  it('deve excluir um usuário', async () => {
    const res = await request(app).delete('/api/usuarios/1');
    expect(res.statusCode).toEqual(204);
  });
});
