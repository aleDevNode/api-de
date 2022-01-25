module.exports = (sequelize, DataTypes) => {
    const Informative = sequelize.define(
      "Informative",
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.STRING,
        },
        title: {
          type: DataTypes.STRING(255),
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Title empty! impossible to register",
            },
          },
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "description empty! impossible to register",
            },
          },
        },
       file_id:{
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        
      },
      {
        tableName: "informatives",
      }
    );
    
    Informative.associate = (models) => {
      Informative.belongsTo(models.File, {
        foreignKey: "file_id",
        as: "file",
      });
    };
    return Informative;
  };
  