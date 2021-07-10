
const request = require('supertest')
const app = require('../../src/app')
const truncate = require('../utils/truncate')
const uuid = require('../../src/utils/uuid')

const factory = require('../utils/factories')

describe('Test user integrations', () => {
    const id = uuid()
    beforeEach(async () => {
        return await truncate()
    })

    it('should list all users', async () => {
      const user = await factory.create("User")
      const {body:{token}}= await request(app).post('/locadora/api/v1/auth')
        .send({
            login: user.login,
            password: '123'
        })
      
        const response = await request(app)
            .get('/locadora/api/v1/users')
            .set("Authorization",`Bearer ${{token}}`)
        expect(response.status).toEqual(200)
    });

    it('should create a user ', async () => {
        const user = await factory.create("User")
        const {body:{token}}= await request(app).post('/locadora/api/v1/auth')
        .send({
            login: user.login,
            password: '123'
        })
        const response = await request(app)
            .post('/locadora/api/v1/users')
            .send({
                id,
                name: "Alessandro B. Vitorio",
                email: "asovitorio@gmail.com",
                login: "asovitorio",
                password: '123'
            })
            .set("Authorization",`Bearer ${{token}}`)
        expect(response.status).toEqual(201)
    });
    it('should update a user ', async () => {
        const user = await factory.create("User")
        const {body:{token}}= await request(app).post('/locadora/api/v1/auth')
        .send({
            login: user.login,
            password: '123'
        })
        const response = await request(app)
            .put('/locadora/api/v1/users')
            .send({
                id,
                name: "Alessandro Barbosa",
                email: "asovitorio@gmail.com",
                login: "asovitorio",
                password: '1234'
            })
            .set("Authorization",`Bearer ${{token}}`)
          
        expect(response.status).toEqual(200)
    });
    it('should delete a user ', async () => {
        const user = await factory.create("User")
        const {body:{token}}= await request(app).post('/locadora/api/v1/auth')
        .send({
            login: user.login,
            password: '123'
        })
      
        const response = await request(app)
            .delete('/locadora/api/v1/users')
            .send({id})
            .set("Authorization",`Bearer ${{token}}`)
        expect(response.status).toEqual(200)
    });



});