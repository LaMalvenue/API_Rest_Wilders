const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WilderSchema = new Schema({
    name: { type: String, unique: true },
    city: String,
    skills: [{ title: String, count: Number }],
});

const WilderModel = mongoose.model("Wilder", WilderSchema);

module.exports = { WilderModel };