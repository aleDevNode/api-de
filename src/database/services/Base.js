const {sequelize} = require('../../models');
const {QueryTypes} = require('sequelize')
class Base {
    constructor(base) {
        this.base = base;
       
    }
    async find(filters) {
        let filter = filters ? Object.keys(filters) : ''
        let value = filters ? filters[filter] : '';
        let where = ''

        try {

            if (filters) {
                where = `WHERE ${filter} = "${value}"`
            }

            let query = `SELECT * FROM ${this.base} ${where}`

            // const result = await sequelize.query(query, {type: QueryTypes.SELECT})

            return query
        } catch (error) {

            throw error
        }
    }

async create(objct) {
        let valuesArr = []
        Object.keys(objct).map(fild => {
            valuesArr.push(objct[fild])
        })

        const valuesMap = valuesArr.map(item =>{
            if(typeof item != 'number') return '"'+item+'"' 
            return item
        })
        
        let filders = Object.keys(objct).join(",")
        let values = valuesMap.join(',')

        try {
            const query = `INSERT INTO ${this.base} (${filders}) VALUES (${values})`;
            // const result = await sequelize.query(query, {type: QueryTypes.INSERT})
            return query
        } catch (error) {
            throw error
        }
    }

}
const find = new Base('users')
const query = find.find({email:'asovitorio@gmail.com'})
console.log(query);

module.exports = {
    Base
}