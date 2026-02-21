const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

class Audit extends Model {
  static initModel(sequelize) {
    Audit.init({
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: () => uuidv4() },
      actorId: { type: DataTypes.UUID, allowNull: true }, // user who performed action
      actorEmail: { type: DataTypes.STRING, allowNull: true },
      action: { type: DataTypes.STRING, allowNull: false }, // e.g. "user.create"
      targetType: { type: DataTypes.STRING, allowNull: true }, // e.g. "user", "application"
      targetId: { type: DataTypes.STRING, allowNull: true },
      details: { type: DataTypes.JSON, defaultValue: {} },
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, { sequelize, modelName: 'audit', timestamps: false });
    return Audit;
  }
}

module.exports = Audit;
