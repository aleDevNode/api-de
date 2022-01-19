module.exports = (sequelize, DataTypes) => {
    const EventFile= sequelize.define(
      "EventFile",
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.STRING
        },
        file_id:{
            type: DataTypes.STRING(255),
            allowNull: false,
            onDelete: 'cascade'
        },
        event_id:{
            type: DataTypes.STRING(255),
            allowNull: false,
            onDelete: 'cascade'
          },
              
      },
      {
        tableName: "event_files",
      }
    );
   

   
    return EventFile;
  };
  