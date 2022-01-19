module.exports = (sequelize, DataTypes) => {
    const Event= sequelize.define(
      "Event",
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
              
      },
      {
        tableName: "events",
      }
    );
    Event.associate = (models) => {
      Event.belongsToMany(models.File, {
        through:"event_files",
        as:"files",
        foreignKey: "event_id",
        
      });
    };

   
    return Event;
  };
  