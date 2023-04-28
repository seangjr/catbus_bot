const {
    ChatInputCommandInteraction,
    Client,
    SlashCommandBuilder,
} = require("discord.js");

const Profile = require("../../models/profile");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("removestrike")
        .setDescription("Removes a strike from the user.")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user to remove a strike from.")
                .setRequired(true),
        )
        .addStringOption((option) =>
            option
                .setName("reason")
                .setDescription("The reason for removing a strike.")
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

        const profile = await Profile.findOne({
            userID: user.id,
        });

        if (!profile) {
            return interaction.reply({
                content: "This user does not have any strikes.",
            });
        }

        const strike = profile.strikes.find((s) => s.reason === reason);
        if (!strike) {
            return interaction.reply({
                content:
                    "This user does not have any strikes with that reason.",
            });
        }

        if (strike.count === 1) {
            profile.strikes = profile.strikes.filter(
                (s) => s.reason !== reason,
            );
        } else {
            strike.count--;
        }

        await profile.save();

        interaction.reply({
            content: `Successfully removed a strike from ${user.tag} for ${reason}.`,
        });
    },
};
