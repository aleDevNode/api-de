const request = require('supertest')
const app = require('../../src/app')
const truncate = require('../utils/truncate')

const factory = require('../utils/factories')

describe('Test user integrations', () => {
   
    beforeEach( async () => {
        return await truncate()
    })

    it('should test jwt autenticated in routes privated', async () => {
      const user = await factory.create("User")
      const {body:{token}}= await request(app).post('/locadora/api/v1/auth')
        .send({
            login: user.login,
            password: '123'
        })
        console.log(token);
        const response = await request(app)
            .get('/locadora/api/v1/users')
            .set("Authorization",`Bearer ${token}`)
        expect(response.status).toEqual(200)
    });
    it('should test token jwt invalid autenticated in routes privated', async () => {
      const user = await factory.create("User")
      const {body:{token}}= await request(app).post('/locadora/api/v1/auth')
        .send({
            login: user.login,
            password: '123'
        })
        const response = await request(app)
            .get('/locadora/api/v1/users')
            .set("Authorization",`Bearer ${token}123`)
        expect(response.status).toEqual(401)
    });
  

  


});