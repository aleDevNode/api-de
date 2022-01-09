module.exports = (sequelize, DataTypes) => {
  const Home = sequelize.define(
    "Home",
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
      sub_title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "sub_title empty! impossible to register",
          },
        },
      },
     file_id:{
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      
    },
    {
      tableName: "home",
    }
  );
  Home.associate = (models) => {
    Home.belongsTo(models.File, {
      foreignKey: "file_id",
      as: "file",
    });
  };
  return Home;
};
