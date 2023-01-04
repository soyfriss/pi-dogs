const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('BreedTemperament', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'Id'
        }
    }, {
        timestamps: false,
        freezeTableName: true
    })
}