const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG' , ()=>{

    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(()=>{
        connection.destroy();
    });

    it('should be an ong create', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            name: "APAC",
            email: "contato@apac.com.br",
            whatsapp : "4700000000",
            city:"Blumenau",
            uf:"SC"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});