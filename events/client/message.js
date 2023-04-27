const { Message, Client } = require("discord.js");
const Profile = require("../../models/profile");

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

        const userID = message.author.id;
        const guildID = message.guild.id;
        let profile = await Profile.findOne({ userID });

        if (!profile) {
            profile = new Profile({
                userID,
                guildID,
                strikes: [],
            });
            await profile.save();
        }

        const content = message.content.toLowerCase();
        if (bannedWords.some((word) => content.includes(word))) {
            const reason = "Using a banned word";
            let strike = profile.strikes.find((s) => s.reason === reason);
            if (!strike) {
                strike = { reason, count: 0 };
                profile.strikes.push(strike);
            }
            strike.count++;
            await profile.save();

            const totalStrikes = profile.strikes.reduce(
                (acc, curr) => acc + curr.count,
                0,
            );

            message.reply(
                `You have been given a strike for: ${reason}. You now have ${totalStrikes} strikes.`,
            );
        }
    },
};
