const { DataTypes, Model } = require("sequelize");
const User = require("./user.model");

class RefreshToken extends Model {}

RefreshToken.init(
    {
        token: {
            type: DataTypes.STRING,
        },
        expires: {
            type: DataTypes.DATE,
        },
        createdByIp: {
            type: DataTypes.STRING,
        },
        revoked: {
            type: DataTypes.DATE,
        },
        revokedByIp: {
            type: DataTypes.STRING,
        },
        replacedByToken: {
            type: DataTypes.STRING,
        },
    },
    { sequelize, modelName: "refreshToken", underscored: true }
);

RefreshToken.belongsTo(User);

module.exports = RefreshToken;
