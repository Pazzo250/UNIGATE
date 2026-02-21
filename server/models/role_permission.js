const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

class RolePermission extends Model {
  static initModel(sequelize) {
    RolePermission.init({
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: () => uuidv4() },
      role: { type: DataTypes.STRING, allowNull: false },
      permission: { type: DataTypes.STRING, allowNull: false }, // e.g. "applications.assign", "payments.refund"
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, { sequelize, modelName: 'role_permission', timestamps: false });
    return RolePermission;
  }
}

module.exports = RolePermission;
