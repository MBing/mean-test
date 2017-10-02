var express = require('express');
var router = express.Router();
// var User = require('../models/user');

router.get('/', function (req, res, next) {
    res.render('index');
});

// router.get('/', function (req, res, next) {
//     var email = '';
//     User.findOne({}, function (err, doc) {
//         if (err) return res.send('Error!');
//         if (doc) email = doc.email
//         res.render('node', {email: email});
//     });
// });

// router.post('/', function(req, res, next) {
//     var email = req.body.email;
//     // create new user with mock data and later replace with body data.
//     var user = new User({
//         firstName: 'John',
//         lastName: 'Doe',
//         password: 'secret',
//         email: email
//     });
//     // tell mongoose to save it to the db (we configured in our app.js root file -> localhost:27017/..)
//     user.save();
//     res.redirect('/');
// });

module.exports = router;
