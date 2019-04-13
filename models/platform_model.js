var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var PlatformSchema = new Schema({

  platform: {
    type: String,
    required: 'Kindly enter the name of the gaming platform',
    maxlength: 100
  },

  description:{
      type: String
  },
  
  price: {
    type: String
  },

  release_date: {
    type: String
  },

  company: {
    type: String
  },

  image: {
    type: String
  },

  specification: {
      type:{
        cpu: String,
        ram: String,
        gpu: String,
        storage: String,
        size: String
      }
  }

});


//automatically creates a collection according to the plural model name. colleciton/model
module.exports = mongoose.model('Platform', PlatformSchema);