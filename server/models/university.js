const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

class University extends Model {
  static initModel(sequelize) {
    University.init({
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: () => uuidv4() },
      name: { type: DataTypes.STRING, allowNull: false },
      country: { type: DataTypes.STRING },
      city: { type: DataTypes.STRING },
      verified: { type: DataTypes.BOOLEAN, defaultValue: false },
      meta: { type: DataTypes.JSON, defaultValue: {} },
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, { sequelize, modelName: 'university' });
    University.beforeUpdate((u) => u.updatedAt = new Date());
    return University;
  }
}

module.exports = University;
