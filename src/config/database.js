require('dotenv').config()
module.exports = {
  dialect: process.env.DB_DIALECT,
  storage:'./db.sqlite'
  // storage: './__tests__/database.sqlite',
  // username: process.env.DB_USER,
  // password: process.env.DB_PASS,
  // database:process.env.DB_DATABASE,
  // host: process.env.DB_HOST,
  // port: parseInt(process.env.DB_PORT),
  // dialectOptions : { 
  //   ssl : { 
  //     rejectUnauthorized : false ,  // muito importante 
  //   } 
  // },
  // timezone: "-03:00",
  // logging: false,
  // define: {
  //   timestamps: true,
  //   underscored: true,
  //   underscoredAll: true,
    
  // }
}