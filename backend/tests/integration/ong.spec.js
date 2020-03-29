const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback(); // reinicia a base de dados
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy(); // desconecta do banco de dados
  });

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name:"Arca da Fé",
        email:"contato@arcadafe.com.br",
        whatsapp:"14999999999",
        city:"Bauru",
        uf:"SP"
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});