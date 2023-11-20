'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('lists', {
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
      type: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: { 
        type: DataTypes.TEXT('long'),
        allowNull: true,
      },
      content: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      uri_content: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: { 
        type: DataTypes.DATE,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id',
        },
      },
      }, 
      {
        tableName: 'lists'
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('lists');
  }
};
