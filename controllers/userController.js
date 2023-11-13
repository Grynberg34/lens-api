const jwt = require('jsonwebtoken');

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
    var type = req.body.type;
    var items = req.body.items;
    
    jwt.verify(token, process.env.JWT_KEY, async function(err, decoded) {
      
      await List.create({
        title: title,
        description: description,
        content: content,
        type: type,
        items: items,
        userId: decoded.id
      })

      return res.status(200).json({ "message":"List created" });

    });
  }


}