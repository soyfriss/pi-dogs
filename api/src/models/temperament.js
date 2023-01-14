const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Temperament', {
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
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
}