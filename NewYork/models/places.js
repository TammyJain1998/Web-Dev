const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5
    },
    imageUrl: {
      type: String,
      required: false // This can be optional, depending on whether you have an image for each place
    },
    createdAt: {
      type: Date,
      default: Date.now // Automatically sets the date when a place is added
    }
  });

  // Compile model from schema
const Place = mongoose.model('Place', placeSchema);

module.exports = Place;