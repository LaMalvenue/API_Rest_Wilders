const mongoose = require('mongoose');

const { Schema } = mongoose;
const WilderSchema = new Schema({
  name: { type: String, unique: true },
  city: String,
  skills: [{ title: String, count: Number }],
});
module.exports = mongoose.model('Wilder', WilderSchema);
// # sourceMappingURL=WilderModel.js.map
