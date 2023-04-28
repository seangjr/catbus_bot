const {
    ChatInputCommandInteraction,
    Client,
    SlashCommandBuilder,
} = require("discord.js");
const Profile = require("../../models/profile");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("clearstrike")
        .setDescription("Clears a strike from the user.")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user to clear a strike from.")
                .setRequired(true),
        ),

    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const user = interaction.options.getUser("user");

        const profile = await Profile.findOne({
            userID: user.id,
        });

        if (!profile) {
            return interaction.reply({
                content: "This user does not have any strikes.",
            });
        }

        profile.strikes = [];

        await profile.save();

        interaction.reply({
            content: "Successfully cleared strikes.",
        });
    },
};
