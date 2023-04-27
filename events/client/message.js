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
            if (userID !== "452794023351025685") return;
            const reason = "Using a banned word";
            let strike = profile.strikes.find((s) => s.reason === reason);
            if (!strike) {
                strike = { reason, count: 1 };
                profile.strikes.push(strike);
            }
            strike.count++;
            await profile.save();

            const totalStrikes = profile.strikes.reduce(
                (acc, curr) => acc + curr.count,
                0,
            );

            message.reply(
                `You have been given a strike for: \`${reason}\`. You now have **${totalStrikes} ${
                    totalStrikes === 1 ? "strike" : "strikes"
                }.**`,
            );

            if (totalStrikes >= 10) {
                const channel = interaction.guild.channels.cache.find(
                    "1100298804940505108",
                );
                await channel.send(
                    `@everyone <@${user.id}> IS A RACIST SIA. :ninja: :ninja: :ninja:`,
                );
            }
        }
    },
};
