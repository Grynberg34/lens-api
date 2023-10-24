const passport = require('passport');
const jwt = require('jsonwebtoken');

var jwtOptions = {};
jwtOptions.secretOrKey = process.env.JWT_KEY;

module.exports = {
  autenticate: function (req,res) {
    passport.authenticate('google', {session: false}, 
    function (err, user, info){
      var payload = { id: user.id };
      var token = jwt.sign(payload, jwtOptions.secretOrKey);
      return res.status(200).json({ "message" : 'Token generated', token: token });
    }) (req, res)
  },
  checkUser: function (req,res,next) {
    var token = req.header('authorization').substr(7);

    jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
      if (err) {
        console.log(err)
        res.status(400).json("False token")
      }
      else {
        next()
      }
    });
  },
}