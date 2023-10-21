const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');


router.get('/', function(req,res){
    res.status(200).json('Insert email and password')
});

router.post('/', loginController.login);

module.exports = router;
