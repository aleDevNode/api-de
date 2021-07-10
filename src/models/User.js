module.exports = (sequelize,DataTypes) =>{
// Datatypes é parametro obrigatorio para os models do sequelize
const User = sequelize.define(
    'User',{
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
        validate:{
          isEmail:{
            msg:'Its not a valid email'
          },
          notEmpty:{
            msg:'Email empty! impossible to register'
          }
        }
      },
      login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
        validate:{
          notEmpty:{
            msg:'User empty! impossible to register'
          }
        }
      },    
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          notEmpty:{
            msg:'Password empty! impossible to register'
          },
         
        }
      },
},
{

 tableName: 'users'//nome da tabela
}
)
return User
}