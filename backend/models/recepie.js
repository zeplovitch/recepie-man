const mongoose = require('mongoose');


const recepieSchema = mongoose.Schema({
  title: String,
  assets: [{ name: String, qty: Number }],
  steps: [{ number: Number, description: String, instructions: String, images: [String] }]
});


module.exports = mongoose.model('Recepie', recepieSchema);


