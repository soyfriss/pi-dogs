const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Breed', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'Id'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'Name'
    },
    height: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'Height'
    },
    weight: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'Weight'
    },
    lifeSpan: {
      type: DataTypes.STRING(50),
      field: 'LifeSpan'
    },
    image: {
      type: DataTypes.STRING,
      field: 'Image'
    },
  }, {
    timestamps: false,
    freezeTableName: true
  });
};
