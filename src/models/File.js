module.exports = (sequelize,DataTypes) =>{
    const File = sequelize.define("File",{

        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING
          },
          url: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate:{
                notEmpty:{
                  msg:'URL empty! impossible to register'
                }
              }
          },
          type: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate:{
                notEmpty:{
                  msg:'TYpe empty! impossible to register'
                }
              }
          },
          duration: {
            type: DataTypes.INTEGER,
            validate:{
                notEmpty:{
                  msg:'Duration empty! impossible to register'
                }
              }
          },
          episode_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
          
          },
    
    },
    {
        tableName: 'file'  
    });
    File.associate = (models) =>{
      File.belongsTo(models.Episode,{
        foreignKey: "episode_id",
        as: "episode",  
      })
    };
    return File

}