const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const tire = sequelize.define('tire', {
		type: {
      type: DataTypes.ENUM('rear', 'front'), 
      allowNull: false,
      primaryKey: true, 
    },
    width: { 
      type: Sequelize.BIGINT,
      allowNull: false,
		},
    aspectRatio: {
      type: DataTypes.BIGINT, 
      allowNull: false 
    },
		wheelSize: {
      type: DataTypes.BIGINT, 
      allowNull: false,
    },
  },{timestamps:false});

  tire.associate = function (models) {
    models.tire.belongsTo(models.user, {
      foreignKey: {
        name: "userId", 
        allowNull:false,
        primaryKey:true
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };

  return tire;
}