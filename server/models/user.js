const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

class User extends Model {
  static initModel(sequelize) {
    User.init({
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: () => uuidv4() },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      passwordHash: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING },
      role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'student' }, // roles: super_admin, admin, university_admin, agent, staff, student
      status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'active' }, // active, suspended, deleted
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, { sequelize, modelName: 'user' });
    // hook to update timestamp
    User.beforeUpdate((u) => u.updatedAt = new Date());
    return User;
  }

  async verifyPassword(password) {
    return bcrypt.compare(password, this.passwordHash);
  }

  static async createWithPassword(payload) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(payload.password, salt);
    delete payload.password;
    return User.create({ ...payload, passwordHash: hash });
  }
}

module.exports = User;
