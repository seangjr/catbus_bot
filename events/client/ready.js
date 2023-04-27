const { loadCommands } = require("../../handlers/command");
const { Client, ActivityType } = require("discord.js");
const mongoose = require("mongoose");
module.exports = {
    name: "ready",
    once: true,
    /**
     *
     * @param {Client} client
     */
    async execute(client) {
        console.log(`Logged in as ${client.user.tag}!`);
        client.user.setPresence({
            activities: [{ name: `for /help`, type: ActivityType.Watching }],
        });

        await loadCommands(client); // Load commands

        // Connect to MongoDB
        mongoose.connect(process.env.MONGO_SRV, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Log when connected to MongoDB
        mongoose.connection.on("connected", () => {
            console.log("Connected to MongoDB!");
        });

        // Log when disconnected from MongoDB
        mongoose.connection.on("disconnected", () => {
            console.log("Disconnected from MongoDB!");
        });
    },
};
