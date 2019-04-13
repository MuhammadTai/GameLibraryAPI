const VideoGame = require('../models/videogame_model');
var express = require('express');
var router = express.Router();

//create a new video game 
exports.create = function (req, res) {
    var new_videogame = new VideoGame(req.body);
    //res.send(new_videogame)
    //console(req.body.title) 
    new_videogame.save(function (err, videogame) {
        if (err)
            res.send(err);
        res.json(videogame);
    });
};


//get all of the video games stored in the database
exports.getAll = function (req, res) {
    //res.json(req.buddy)
    VideoGame.find({}, function (err, videogame) {
        if (err)
            res.send(err);
        console.log(videogame)
        res.json(videogame);
    });

};

//get a specific video game by using the id of the document
exports.getOne = function (req, res) {
    console.log(req.params._id);
    VideoGame.findById(req.params._id, function (err, videogame) {
        if (err)
            res.send(err);
        res.json(videogame);
    })
};

// Update an entire video game document with a given id
exports.update = function (req, res) {
    VideoGame.findOneAndUpdate({
        _id: req.params._id
    }, 
    req.body, 
    {
        new: true
    }, function (err, videogame) {
        if (err)
            res.send(err);
        res.json(videogame);
    });
};

//update single embeded values in video game documents
exports.update_min_cpu = function (req, res) {

    if(!req.body.cpu) {
        return res.status(400).send({
            message: "Please Enter cpu"
        });
    }
    VideoGame.findOneAndUpdate({
        _id: req.params._id
    
    },
    {
        "platform.min_system_requirements.cpu" : req.body.cpu
    },
    {
        new: true
    }, function (err, videogame) {
        if (err)
            res.send(err);
        res.json(videogame);
    });
};


//update single embeded values in video game documents array
exports.update_review_rating = function (req, res) {

    if(!req.body.rating) {
        return res.status(400).send({
            message: "Please Enter rating"
        });
    }
    VideoGame.findOneAndUpdate({
        _id: req.params._id,
        "review.id": req.params.id
    },
    {
        $set:{
            "review.$.rating" : req.body.rating
        }
    },
    {
        new: true
    }, function (err, videogame) {
        if (err)
            res.send(err);
        res.json(videogame);
    });
};

//add to the review array
exports.add_review = function (req, res) {
    VideoGame.findByIdAndUpdate({
        _id: req.params._id
        
    },
    {
        $push:{"review":
            {
            "id" : req.body.id,
            "reviewer" : req.body.reviewer,
            "rating" : req.body.rating
            }
        }
    },
    {
        new: true
    }, function (err, videogame) {
        if (err)
            res.send(err);
        res.json(videogame);
    });
};


// Delete a video game with the given id 
exports.delete = function (req, res) {
    VideoGame.remove({
        _id: req.params._id
    }, function (err, videogame) {
        if (err)
            res.send(err);
        res.json({
            message: 'Video Game successfully deleted'
        });
    });
};

//delete entry from the array
exports.delete_review = function (req, res) {
    VideoGame.findByIdAndUpdate({
        _id: req.params._id,
    },
    {
        $pull:{"review":
            {
            "id" : req.params.id,
            }
        }
    },
    {
        new: true
    }, function (err, videogame) {
        if (err)
            res.send(err);
        res.json(videogame);
    });
};