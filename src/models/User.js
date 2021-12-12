module.exports = (sequelize, DataTypes) => {
  // Datatypes é parametro obrigatorio para os models do sequelize
  const User = sequelize.define(
    "User",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      member_id:{
        type: DataTypes.STRING(255),
        allowNull: false,
      },
     
      login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "User empty! impossible to register",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password empty! impossible to register",
          },
        },
      },

      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "status empty! impossible to register",
          },
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "status empty! impossible to register",
          },
        },
      },
    },
    {
      tableName: "users", //nome da tabela
    }
  );
  User.associate = (models) =>{
    User.belongsTo(models.Member,{
      foreignKey: "member_id",
      as: "member",  
    })
  }
  return User;
};
