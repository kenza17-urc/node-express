'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Woods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
            validate: {
              notNull: { msg: "Le nom est requis" },
            },
      },
      type: {
        type: Sequelize.ENUM('softwood', 'exotic wood', 'noble and hardwoods'),
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
        type: Sequelize.ENUM('tender', 'medium-hard', 'hard'),
        allowNull: false,
        validate: {
          notNull: { msg: "La dureté est requise" },
          isIn: {
            args: [['tender', 'medium-hard', 'hard']],
            msg: "Dureté invalide"
          }
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Woods');
  }
};