const { DataTypes, Model } = require('sequelize');

class Setting extends Model {
  static initModel(sequelize) {
    Setting.init({
      key: { type: DataTypes.STRING, primaryKey: true },
      value: { type: DataTypes.JSON, allowNull: true },
      description: { type: DataTypes.STRING, allowNull: true },
      updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, { sequelize, modelName: 'setting', timestamps: false });
    return Setting;
  }
}

module.exports = Setting;
