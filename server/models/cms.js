const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

class CMS extends Model {
  static initModel(sequelize) {
    CMS.init({
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: () => uuidv4() },
      type: { type: DataTypes.STRING, allowNull: false }, // page, post, faq, testimonial
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
      title: { type: DataTypes.STRING },
      content: { type: DataTypes.TEXT }, // HTML / markdown
      status: { type: DataTypes.STRING, defaultValue: 'draft' }, // draft, published, archived
      meta: { type: DataTypes.JSON, defaultValue: {} },
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, { sequelize, modelName: 'cms' });
    CMS.beforeUpdate((u) => u.updatedAt = new Date());
    return CMS;
  }
}

module.exports = CMS;
