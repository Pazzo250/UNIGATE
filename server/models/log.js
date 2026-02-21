const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

class SysLog extends Model {
  static initModel(sequelize) {
    SysLog.init({
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: () => uuidv4() },
      level: { type: DataTypes.STRING, allowNull: false }, // info, warn, error
      source: { type: DataTypes.STRING },
      message: { type: DataTypes.TEXT },
      metadata: { type: DataTypes.JSON, defaultValue: {} },
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, { sequelize, modelName: 'sys_log', timestamps: false });
    return SysLog;
  }
}

module.exports = SysLog;
