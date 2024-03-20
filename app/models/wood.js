'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wood extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Wood.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Le nom est requis" },
      },
    },
    type: {
      type: DataTypes.ENUM('softwood', 'exotic wood', 'noble and hardwoods'),
      allowNull: false,
      validate: {
        notNull: { msg: "Le type est requis" },
        isIn: {
          args: [['softwood', 'exotic wood', 'noble and hardwoods']],
          msg: "Type invalide"
        }
      },
    },
    hardness: {
      type: DataTypes.ENUM('tender', 'medium-hard', 'hard'),
      allowNull: false,
      validate: {
        notNull: { msg: "La dureté est requise" },
        isIn: {
          args: [['tender', 'medium-hard', 'hard']],
          msg: "Dureté invalide"
        }
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "L'image est requise" },
      }
    }
    
  }, {
    sequelize,
    modelName: 'Wood',
  });
  return Wood;
};