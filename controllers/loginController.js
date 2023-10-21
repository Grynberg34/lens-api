const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

var jwtOptions = {};
jwtOptions.secretOrKey = process.env.JWT_KEY;

module.exports= {

    login: function (req,res) {
        var email = req.body.email;
        var password = req.body.password;
      
        User.findOne({ where :{email: email}})
        .then(function(user){

            if (user) {
                bcrypt.compare(password, user.password, function(err, isMatch) {
                    if(isMatch){
                    var payload = { id: user.id };
                    var token = jwt.sign(payload, jwtOptions.secretOrKey);
                    return res.status(200).json({ "mensagem" : 'Token generated', token: token });
                    } 
                    else {
                        return res.status(400).json({ "mensagem" : 'Incorrect password' });
                    }
                })
            }
            else {
                return res.status(400).json({ "mensagem": 'User not found' });
            }
        })
        .catch(function(err){
            console.log(err)
            res.redirect('/login')
        });
    }
}
