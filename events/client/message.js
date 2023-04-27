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
        // schema creation
        let profileData;
        try {
            profileData = profileSchema.findOne({
                userID: message.author.id,
            });
            if (!profileData) {
                let profile = await profileSchema.create({
                    userID: message.author.id,
                    guildID: message.guild.id,
                    strikes: 0,
                });
                profile.save();
            }
        } catch (err) {
            console.log(err);
        }

        // const ashtonsProfile = await profileSchema.findOne({
        //     userID: "452794023351025685",
        // });

        if (message.author.bot) return;

        const containsBannedWord = bannedWords.some((word) =>
            message.content.toLowerCase().includes(word),
        );

        if (containsBannedWord) {
            // ashtonsProfile.strikes += 1;
            // await ashtonsProfile.save();
            profileData.strikes += 1;
            await profileData.save();
            message.reply(
                `⚒️ You have been given a strike for using a banned word. **Total strikes: ${ashtonsProfile.strikes}**`,
            );
        }

        const channelId = "1100298804940505108";
        const channel = client.channels.cache.get(channelId);
        if (strikes[message.author.id] >= 10) {
            // channel.send(
            //     "@everyone ASHTON IS A RACIST. :ninja: :ninja: :ninja: 🐒 🐒 🧑🏿",
            // );
            channel.send("test msg from cat bus bot");
        }
    },
};
