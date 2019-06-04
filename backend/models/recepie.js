const mongoose = require('mongoose');


const recipeSchema = mongoose.Schema({
  title: String,
  assets: [{ name: String, qty: Number }],
  steps: [{ number: Number, description: String, instructions: String, images: [String] }]
});


module.exports = mongoose.model('Recipe', recipeSchema);


