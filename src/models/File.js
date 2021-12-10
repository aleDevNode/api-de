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
      })
    };
    return File

}