const {
  User
} = require('../../src/models')
const uuid = require('../../src/utils/uuid')
const request = require('supertest')
const app = require('../../src/app')
const truncate = require('../utils/truncate')
const factory = require('../utils/factories')
describe('Test Auth integrations', () => {

  beforeEach( async() => {
     await truncate()
  })
  
 
  it('should login of authenticate a user ', async () => {
    const user = await factory.create("User")
    const response = await request(app)
      .post('/locadora/api/v1/auth')
      .send({
        login: user.login,
        password: '123'
      })
    expect(response.status).toEqual(200)
  });

  it('should login not authenticate a user ', async () => {
    const user = await factory.create("User")
    const response = await request(app)
      .post('/locadora/api/v1/auth')
      .send({
        login: user.login + 'aaa',
        password: '123'
      })
    expect(response.status).toEqual(401)
  });

  it('should login not authenticate a password ', async () => {
    const user = await factory.create("User")
    const response = await request(app)
      .post('/locadora/api/v1/auth')
      .send({
        login: user.login,
        password: '1232'
      })
    expect(response.status).toBe(401)
  });
  it('should login not authenticate a password ', async () => {
    const user = await factory.create("User")
    const response = await request(app)
      .post('/locadora/api/v1/auth')
      .send({
        login: user.login,
        password: '1232'
      })
    expect(response.status).toBe(401)
  });
  it('should login not authenticate a bd ', async () => {
    const user = await factory.create("User")
    const response = await request(app)
      .post('/locadora/api/v1/auth')
      .send({
        gggg: user.login,
        password: '1232'
      })
    expect(response.status).toBe(401)
  });
 
  
});