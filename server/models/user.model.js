const { DataTypes, Model } = require("sequelize");
const EventOrganizer = require("./eventOrganizer.model");

class User extends Model {}

User.init(
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
        profilePicPath: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dateOfBirth: {
            type: DataTypes.DATE,
        },
        address: {
            type: DataTypes.STRING,
        },
    },
    { sequelize, modelName: "user", underscored: true }
);

module.exports = User;
