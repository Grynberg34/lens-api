const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports= {

    register: async function (req,res) {
        var name = req.body.name;
        var email = req.body.email;
        var password = req.body.password;
        var repeat = req.body.repeatpassword;

        if (password == null || email == null) {
            return res.status(400).json("don't leave fields empty.")
        } 

        if (password == repeat) {

            var hashed = bcrypt.hashSync(password, 10);
            try {
                await User.create({ name: name, email: email, password: hashed, token_redefine: null });
                return res.status(201).json('registered');
            }
            catch(err){
                console.log(err)
                return res.status(400).json('try again');
            }
                
        }
        else return res.status(400).json("passwords don't match");
    }
}
