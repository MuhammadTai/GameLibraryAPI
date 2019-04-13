var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var VideoGameSchema = new Schema({

  title: {
    type: String,
    required: 'Kindly enter the name of title of the video game',
    maxlength: 100
  },
  
  updated: {
    type: Date,
    default: Date.now()
    
  },

  release_date: {
    type: String
  },

  genre: {
    type: [{
      type: String,
      enum: ['unkown', 'FPS', 'ADVENTURE', 'RPG', 'MMO', 'HORROR', 'FIGHTING', 'SPORTS']
    }],
    default: ['unknown']
  },

  developer: {
    type: String
  },

  publisher: {
    type: String
  },

  cover: {
    type: String
  },

  age_rating: {
    type: String,
    enum: ['!(Parental Guidance)', '3+', '7+', '12+', '16+', '18+']
  },

  platform: {
  
    name:[{
      type:String,
      enum:['Playstation', 'Xbox', 'Nintendo','PC'],
    }],

    min_system_requirements:{
      cpu: String,
      ram: String,
      gpu: String,
      storage: String,
      os: String
    },

    rec_system_requirements:{
      cpu: String,
      ram: String,
      gpu: String,
      storage: String,
      os: String
    }
  },

  review:
  [{
    id: Number,
    reviewer:{
      type: String
    },
    rating:{
      type: Number
    }
    
  }]

});


//automatically creates a collection according to the plural model name. colleciton/model
module.exports = mongoose.model('VideoGame', VideoGameSchema);