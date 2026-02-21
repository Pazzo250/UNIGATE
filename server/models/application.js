const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

class Application extends Model {
  static initModel(sequelize) {
    Application.init({
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: () => uuidv4() },
      applicantId: { type: DataTypes.UUID, allowNull: false },
      universityId: { type: DataTypes.UUID, allowNull: false },
      program: { type: DataTypes.STRING },
      status: { type: DataTypes.STRING, defaultValue: 'submitted' }, // submitted, under_review, pending, accepted, rejected
      assignedReviewer: { type: DataTypes.UUID, allowNull: true },
      documents: { type: DataTypes.JSON, defaultValue: [] },
      fraudFlag: { type: DataTypes.BOOLEAN, defaultValue: false },
      score: { type: DataTypes.FLOAT, defaultValue: 0.0 },
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, { sequelize, modelName: 'application' });
    Application.beforeUpdate((u) => u.updatedAt = new Date());
    return Application;
  }
}

module.exports = Application;
