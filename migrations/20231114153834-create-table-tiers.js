'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('tiers', {
      id: { 
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true   
      },
      title: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      order: { 
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      listId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: 'lists'
          },
          key: 'id',
        },
      },
      }, 
      {
        tableName: 'tiers'
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tiers');
  }
};
