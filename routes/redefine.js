const express = require('express');
const router = express.Router();
const redefineController = require('../controllers/redefineController');


router.get('/', function(req,res){
    res.status(200).json('Insert your email to receive a code.')
});

router.post('/', redefineController.askForNewPass);

router.post('/newpass', redefineController.changePass);

module.exports = router;
