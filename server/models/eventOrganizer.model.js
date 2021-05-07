const { DataTypes, Model } = require("sequelize");
const User = require("./user.model");

class EventOrganizer extends Model {}

EventOrganizer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        verificationDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        profilePicPath: {
            type: DataTypes.STRING,
        },
    },
    { sequelize, underscored: true, modelName: "eventOrganizer" }
);

EventOrganizer.hasMany(User);

module.exports = EventOrganizer;
