const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

class Ticket extends Model {
  static initModel(sequelize) {
    Ticket.init({
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: () => uuidv4() },
      userId: { type: DataTypes.UUID, allowNull: true }, // who created
      subject: { type: DataTypes.STRING, allowNull: false },
      messages: { type: DataTypes.JSON, defaultValue: [] }, // array of {from, text, ts}
      status: { type: DataTypes.STRING, defaultValue: 'open' }, // open, pending, resolved, closed
      priority: { type: DataTypes.STRING, defaultValue: 'normal' }, // low, normal, high
      assignedTo: { type: DataTypes.UUID, allowNull: true }, // staff id
      meta: { type: DataTypes.JSON, defaultValue: {} },
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, { sequelize, modelName: 'ticket' });
    Ticket.beforeUpdate((t) => t.updatedAt = new Date());
    return Ticket;
  }
}

module.exports = Ticket;
