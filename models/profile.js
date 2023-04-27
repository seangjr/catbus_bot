const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true },
    guildID: { type: String, require: true },
    strikes: [
        {
            reason: { type: String, require: true },
            count: { type: Number, require: true },
        },
    ],
});

const model = mongoose.model("Profile", profileSchema);

module.exports = model;
