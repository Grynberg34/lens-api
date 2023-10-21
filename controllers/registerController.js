const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports= {

    register: async function (req,res) {
        var nome = req.body.nome;
        var email = req.body.email;
        var password = req.body.password;
        var repeat = req.body.repeatpassword;

        if (password == null || email == null) {
            return res.status(400).json("Don't leave the space empty.")
        } 

        if (password == repeat) {

            var hashed = bcrypt.hashSync(password, 10);
            try {
                await User.create({ nome: nome, email: email, password: hashed, token_redefine: null });
                return res.status(201).json('Registered.');
            }
            catch(err){
                console.log(err)
                return res.status(400).json('Try again.');
            }
                
        }
        else return res.status(400).json("Passwords don't match.");
    }
}
