const { DataTypes, Model } = require("sequelize");

class Admin extends Model {}

Admin.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password_hash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { sequelize, modelName: "admin", underscored: true }
);

module.exports = Admin;
