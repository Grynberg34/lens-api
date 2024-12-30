const jwt = require('jsonwebtoken');
const User = require('../models/User');
const List = require('../models/List');
const Item = require('../models/Item');
const Tier = require('../models/Tier');

var jwtOptions = {};
jwtOptions.secretOrKey = process.env.JWT_KEY;

module.exports = {
  showUser: function (req,res) {
    var token = req.header('authorization').substr(7);

    jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
      res.status(200).json(decoded)
    });
  },
  createList: async function (req,res) {
    var token = req.header('authorization').substr(7);
    var title = req.body.title;
    var description = req.body.description;
    var content = req.body.content;
    var uri_content = req.body.uri_content;
    var type = req.body.type;
    var items = req.body.items;
    var tiers = req.body.tiers;
    var date = new Date;
    
    jwt.verify(token, process.env.JWT_KEY, async function(err, decoded) {
      
      var list = await List.create({
        title: title,
        description: description,
        content: content,
        uri_content: uri_content,
        type: type,
        userId: decoded.id,
        date: date
      });

      if (tiers?.length > 0) {

        for (var i = 0; i < tiers.length; i++) {
          await Tier.create({
            title: tiers[i],
            order: i,
            listId: list.id
          })
        }
      }

      for (var i = 0; i < items.length; i++) {
        await Item.create({
          movie_id: items[i],
          order: i,
          listId: list.id
        })
      }

      return res.status(200).json({ "message":"List created" });

    });
  },
  getWatchist: async function (req,res) {
    var token = req.header('authorization').substr(7);
    var id = req.params.id;
    
    jwt.verify(token, process.env.JWT_KEY, async function(err, decoded) {

      var list = await List.findOne({where:{
        userId: decoded.id,
        id: id,
        type: 'watch'
      }})

      if (list !== null) {
        var items = await Item.findAll({
          where: {
            listId: list.id
          },
          order: [
            ['order', 'asc' ]
          ]
        })

        var user = await User.findOne({where: {
          id: list.userId
        }})
        list.dataValues.username = user.name;
  
        list.dataValues.items = items;
        
        return res.status(200).json(list);
      } else {
        return res.status(400).json('Error');
      }



    });
  },
  getTierlist: async function (req,res) {
    var token = req.header('authorization').substr(7);
    var id = req.params.id;
    
    jwt.verify(token, process.env.JWT_KEY, async function(err, decoded) {

      var list = await List.findOne({where:{
        userId: decoded.id,
        id: id,
        type: 'tier'
      }})

      if (list !== null) {
        var items = await Item.findAll({
          where: {
            listId: list.id
          },
          order: [
            ['order', 'asc' ]
          ]
        })

        var tiers = await Tier.findAll( {
          where: {
            listId: list.id
          },
          order: [
            ['order', 'asc' ]
          ]
        })

        for (var i = 0; i < tiers.length; i++) {
          tiers[i].dataValues.items = [];
        }
      } 

      var user = await User.findOne({where: {
        id: list.userId
      }})

      list.dataValues.username = user.name;

      list.dataValues.items = items;

      list.dataValues.tiers = tiers;
      
      return res.status(200).json(list);

    });
  }

}