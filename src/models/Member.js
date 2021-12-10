module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define(
    "Member",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Title empty! impossible to register",
          },
        },
      },
      func: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "function empty! impossible to register",
          },
        },
      },
      birth:{
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Birth day empty! impossible to register",
          },
        },
      },

      rf: {
        type: DataTypes.STRING(255),

        validate: {
          notEmpty: {
            msg: "rf empty! impossible to register",
          },
        },
      },
      full_name: {
        type: DataTypes.STRING(255),

        validate: {
          notEmpty: {
            msg: "fullName empty! impossible to register",
          },
        },
      },

      email: {
        type: DataTypes.STRING(255),

        validate: {
          isEmail: true,
          notEmpty: {
            msg: "fullName empty! impossible to register",
          },
        },
      },
      cellphone: {
        type: DataTypes.STRING(255),

        validate: {
          notEmpty: {
            msg: "fullName empty! impossible to register",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
      },
      time: {
        type: DataTypes.BOOLEAN,
      },
      location: {
        type: DataTypes.STRING(255),
      },
      file_id:{
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
      },

    },
    {
      tableName: "members", //nome da tabela
    }
  );
  Member.associate = (models) => {
    Member.hasOne(models.User, {
      foreignKey: "member_id",
      as: "user",
    });

    Member.belongsTo(models.File,{
        foreignKey: "file_id",
        as: "file",  
    })
  };
  return Member;
};
