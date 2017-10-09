var express = require('express');
var router = express.Router();

var Message = require('../models/message');

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

router.post('/', function (req, res, next) {
    var message = new Message({
        content: req.body.content
    });
    message.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        // no 'return' keyword needed, return is implicit on last thing
        res.status(201).json({
            message: 'Saved Message',
            obj: result
        })
    })
});

module.exports = router;
