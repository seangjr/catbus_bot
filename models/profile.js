const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true },
    guildID: { type: String, require: true },
    strikes: { type: Number, default: 0 },
});

const model = mongoose.model("ProfileModel", profileSchema);

module.exports = model;
