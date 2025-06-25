const request = require('supertest');
const app = require('../app');  // Importa o app para testar as rotas

describe('API de Livros', () => {
  it('deve criar um novo livro', async () => {
    const res = await request(app)
      .post('/api/livros')
      .send({
        titulo: 'Livro Exemplo',
        autor: 'Autor Exemplo',
        ano: 2020,
        genero: 'Ficção'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('deve listar todos os livros', async () => {
    const res = await request(app).get('/api/livros');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('deve atualizar um livro', async () => {
    const res = await request(app)
      .put('/api/livros/1')
      .send({ titulo: 'Livro Atualizado', autor: 'Autor Atualizado' });
    expect(res.statusCode).toEqual(200);
  });

  it('deve excluir um livro', async () => {
    const res = await request(app).delete('/api/livros/1');
    expect(res.statusCode).toEqual(204);
  });
});
