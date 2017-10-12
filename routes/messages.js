var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Message = require('../models/message');
var User = require('../models/user');

// Any route setup here will have '/message' in front of it, cuz that was set in /app.js (root dir)
router.get('/', function(req, res, next) {
    Message.find()
        .exec(function (err, messages) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: messages
            })
        })
});

router.use('/', function(req, res, next) {
    jwt.verify(req.query.token, 'secret', function(err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
});

router.post('/', function (req, res, next) {
    // always verify before decode, here we use decode,
    // cuz we have verified it before and we don't need to double verify it.
    // verify also passes a decoded value we can use.
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        console.log('user', user);
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        var message = new Message({
            content: req.body.content,
            user: user._id
        });
        message.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            user.messages.push(result);
            user.save();

            // no 'return' keyword needed, return is implicit on last thing
            res.status(201).json({
                message: 'Saved Message',
                obj: result
            })
        })
    })
});

// alternative to PUT
router.patch('/:id', function (req, res, next) {
    Message.findById(req.params.id, function (err, message) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'No Message Found',
                error: {message: 'Message not found'}
            })
        }
        message.content = req.body.content;
        message.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }

            // no 'return' keyword needed, return is implicit on last thing
            res.status(200).json({
                message: 'Updated Message',
                obj: result
            })
        })
    })
});

router.delete('/:id', function (req, res, next) {
    Message.findById(req.params.id, function (err, message) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'No Message Found',
                error: {message: 'Message not found'}
            })
        }
        message.content = req.body.content;
        message.remove(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }

            // no 'return' keyword needed, return is implicit on last thing
            res.status(200).json({
                message: 'Deleted Message',
                obj: result
            })
        })
    })
});

module.exports = router;
