module.exports = (sequelize,DataTypes) =>{
    const Episode = sequelize.define("Episode",{
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING
          },
          title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate:{
                notEmpty:{
                  msg:'Title empty! impossible to register'
                }
              }
          },
          members: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate:{
                notEmpty:{
                  msg:'Members empty! impossible to register'
                }
              }
          },
        
          thumbnail: {
            type: DataTypes.STRING(255),
            
            validate:{
                notEmpty:{
                  msg:'thumbnail empty! impossible to register'
                }
              }
          },
          description: {
            type: DataTypes.TEXT,
           
          },
    },
    {
    tableName: 'episodes'//nome da tabela  
    });
    Episode.associate = (models) => {
      Episode.hasOne(models.File, {
        foreignKey: "episode_id",
        as: "file",
       
      });
    };
    return Episode
}