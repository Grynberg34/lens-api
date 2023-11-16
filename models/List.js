const connection = require('../config/database');
const { DataTypes } = require('sequelize');
const User= require('./User');

const List = connection.define('List', {
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
    type: DataTypes.STRING,
    allowNull: true,
  },
  content: { 
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: { 
    type: DataTypes.DATE,
    allowNull: false
  },

},{
  tableName: 'lists'
});

List.belongsTo(User, {foreignKey: 'userId'});

module.exports = List;
