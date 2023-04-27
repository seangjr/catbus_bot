const profileSchema = require("../../models/profile");
const { Message, Client } = require("discord.js");

module.exports = {
    name: "messageCreate",
    /**
     *
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, client) {
        const bannedWords = [
            "gay",
            "black",
            "jew",
            "malay",
            "indian",
            "brown",
            "smelly",
            "monkey",
        ];

        const content = message.content.toLowerCase();
        if (bannedWords.some((word) => content.includes(word))) {
            const userID = message.author.id;
            const update = { $inc: { strikes: 1 } };
            const options = { new: true, upsert: true };
            const profile = await profileSchema.findOneAndUpdate(
                { userID },
                update,
                options,
            );

            if (profile.strikes >= 10) {
                const channelId = "1100298804940505108";
                const channel = message.guild.channels.cache.get(channelId);
                channel.send(
                    `<@${userId}> IS A RACIST SIA. :ninja: :ninja: :ninja:`,
                );

                profile.strikes = 0;
                await profile.save();
            }
        }
    },
};
