'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('items', {
      id: { 
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true   
      },
      movie_id: { 
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
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      tierId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: 'tiers'
          },
          key: 'id',
        },
      },
      }, 
      {
        tableName: 'items'
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('items');
  }
};
