const {factory} = require('factory-girl')
const uuid = require('../../src/utils/uuid')
const faker = require('faker')
const bcrypt = require('bcrypt')
const {User} = require('../../src/models')

factory.define('User',User,{
    id:uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    login: faker.internet.domainName(),
    password:bcrypt.hashSync('123',10)
})

module.exports = factory;