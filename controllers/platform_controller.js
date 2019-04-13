const Platform = require('../models/platform_model');
var express = require('express');
var router = express.Router();

//create a new platform
exports.create = function (req, res) {
    var new_platform = new Platform(req.body);
    new_platform.save(function (err, platform) {
        if (err)
            res.send(err);
        res.json(platform);
    });
};


//get all of the platforms stored in the database
exports.getAll = function (req, res) {
    Platform.find({}, function (err, platform) {
        if (err)
            res.send(err);
        console.log(platform)
        res.json(platform);
    });

};

//get a specific platform by using the id of the document
exports.getOne = function (req, res) {
    console.log(req.params._id);
    Platform.findById(req.params._id, function (err, platform) {
        if (err)
            res.send(err);
        res.json(platform);
    })
};

// Update an entire platform document with a given id
exports.update = function (req, res) {
    Platform.findOneAndUpdate({
        _id: req.params._id
    }, 
    req.body, 
    {
        new: true
    }, function (err, platform) {
        if (err)
            res.send(err);
        res.json(platform);
    });
};


// Delete a platform with the given id 
exports.delete = function (req, res) {
    Platform.remove({
        _id: req.params._id
    }, function (err, platform) {
        if (err)
            res.send(err);
        res.json({
            message: 'Platform successfully deleted'
        });
    });
};
