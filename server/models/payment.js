const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

class Payment extends Model {
  static initModel(sequelize) {
    Payment.init({
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: () => uuidv4() },
      userId: { type: DataTypes.UUID, allowNull: false },
      applicationId: { type: DataTypes.UUID, allowNull: true },
      amount: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
      currency: { type: DataTypes.STRING, allowNull: false, defaultValue: 'USD' },
      provider: { type: DataTypes.STRING, defaultValue: 'test' },
      providerTxnId: { type: DataTypes.STRING },
      status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'pending' }, // pending, confirmed, refunded, failed
      meta: { type: DataTypes.JSON, defaultValue: {} },
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, { sequelize, modelName: 'payment' });
    Payment.beforeUpdate((p) => p.updatedAt = new Date());
    return Payment;
  }
}

module.exports = Payment;
