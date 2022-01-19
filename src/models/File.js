module.exports = (sequelize,DataTypes) =>{
    const File = sequelize.define("File",{

        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING
          },
          path: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate:{
                notEmpty:{
                  msg:'Path empty! impossible to register'
                }
              }
          },
          file_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate:{
                notEmpty:{
                  msg:'file_name empty! impossible to register'
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
    },
    {
        tableName: 'files'  
    });
    File.associate = (models) =>{
      File.hasOne(models.Member,{
        foreignKey: "file_id",
        as: "file", 
       
      });
      File.hasOne(models.Home,{
        foreignKey: "file_id",
        as: "home", 
       
      });
      File.hasOne(models.About,{
        foreignKey: "file_id",
        as: "about", 
       
      });
      File.hasOne(models.Informative,{
        foreignKey: "file_id",
        as: "informative", 
      });

      File.associate = (models) => {
        File.belongsToMany(models.Event, {
          foreignKey: "file_id",
          as:"event",
        through:"event_files",
        });
      };
  
     
    };
    return File

}