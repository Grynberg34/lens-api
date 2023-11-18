const connection = require('../config/database');
const { DataTypes } = require('sequelize');
const User= require('./User');
const List= require('./List');

const Tier = connection.define('Tier', {
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

},{
  tableName: 'tiers'
});

Tier.belongsTo(List, {foreignKey: 'listId', onUpdate: 'cascade', onDelete: 'CASCADE'});

module.exports = Tier;
