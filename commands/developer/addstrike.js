const {
    ChatInputCommandInteraction,
    Client,
    SlashCommandBuilder,
} = require("discord.js");
const Profile = require("../../models/profile");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("addstrike")
        .setDescription("Adds a strike to the user.")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user to add a strike to.")
                .setRequired(true),
        )
        .addStringOption((option) =>
            option
                .setName("reason")
                .setDescription("The reason for adding a strike.")
                .setRequired(true),
        ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason");

        if (user.id !== "452794023351025685") {
            return interaction.reply({
                content: "You're not Ashton.",
            });
        }

        const profile = await Profile.findOne({
            userID: user.id,
        });

        if (!profile) {
            const newProfile = new Profile({
                userID: user.id,
                strikes: [],
            });

            await newProfile.save();
        }

        const strike = profile.strikes.find((s) => s.reason === reason);
        if (!strike) {
            profile.strikes.push({
                reason,
                count: 1,
            });
        }

        await profile.save();

        await interaction.reply({
            content: `Added a strike to ${user.username} for: \`${reason}\``,
        });

        const totalStrikes = profile.strikes.reduce(
            (acc, curr) => acc + curr.count,
            0,
        );

        if (totalStrikes >= 10) {
            const channel = interaction.guild.channels.cache.find(
                "1100298804940505108",
            );
            await channel.send(
                `@everyone <@${user.id}> IS A RACIST SIA. :ninja: :ninja: :ninja:`,
            );
        }
    },
};
