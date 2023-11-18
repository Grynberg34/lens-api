const connection = require('../config/database');
const { DataTypes } = require('sequelize');
const List= require('./List');
const Tier= require('./Tier');

const Item = connection.define('Item', {
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

},{
  tableName: 'items'
});

Item.belongsTo(List, {foreignKey: 'listId', onUpdate: 'cascade', onDelete: 'CASCADE'});

module.exports = Item;
