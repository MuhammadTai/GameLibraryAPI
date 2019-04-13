var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Video Game Library App' });
});

//VideoGame Routes
var videogames = require('../controllers/videogame_controller');

//Create a new Video Game
router.post('/videogames', videogames.create);

//Get every video game
router.get('/videogames', videogames.getAll);

//Get one video game
router.get('/videogames/:_id', videogames.getOne);

//Update a videogame with Id
router.put('/videogames/:_id', videogames.update);

//Update the embedded value of rating from review array
router.put('/videogamesrating/:_id/:id', videogames.update_review_rating);

//add an entry to the review array
router.put('/videogamesreview/:_id', videogames.add_review);

//Update the embedded value of cpu from review
router.put('/videogamesmincpu/:_id', videogames.update_min_cpu );

//Delete a videogame with Id
router.delete('/videogames/:_id', videogames.delete);

//Delete an entry in the review array with a given id
router.delete('/videogamesreview/:_id/:id', videogames.delete_review);





//Platform ROutes
var platforms = require('../controllers/platform_controller');

//Create a new platform
router.post('/platforms', platforms.create);

//Get every platform
router.get('/platforms', platforms.getAll);

//Get one platform
router.get('/platforms/:_id', platforms.getOne);

//Update a platform with Id
router.put('/platforms/:_id', platforms.update);

//Delete a platform with Id
router.delete('/platforms/:_id', platforms.delete);




module.exports = router;