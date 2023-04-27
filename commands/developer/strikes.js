const {
    ChatInputCommandInteraction,
    Client,
    SlashCommandBuilder,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("strikes")
        .setDescription("Displays a list of strikes for the user.")
        .addSubcommand((options) =>
            options
                .setName("add")
                .setDescription("Adds a strike to the user.")
                .addUserOption((option) =>
                    option
                        .setName("user")
                        .setDescription("The user to add the strike to.")
                        .setRequired(true),
                )
                .addSubcommand((options) =>
                    options
                        .setName("remove")
                        .setDescription("Removes a strike from the user.")
                        .addUserOption((option) =>
                            option
                                .setName("user")
                                .setDescription(
                                    "The user to remove the strike from.",
                                )
                                .setRequired(true),
                        )
                        .addSubcommand((options) =>
                            options
                                .setName("reset")
                                .setDescription("Resets the user's strikes.")
                                .addUserOption((option) =>
                                    option
                                        .setName("user")
                                        .setDescription(
                                            "The user to reset the strikes of.",
                                        )
                                        .setRequired(true),
                                )
                                .addSubcommand((options) =>
                                    options
                                        .setName("view")
                                        .setDescription(
                                            "Views the user's strikes.",
                                        )
                                        .addUserOption((option) =>
                                            option
                                                .setName("user")
                                                .setDescription(
                                                    "The user to view the strikes of.",
                                                )
                                                .setRequired(true),
                                        )
                                        .addSubcommand((options) =>
                                            options
                                                .setName("set")
                                                .setDescription(
                                                    "Sets the user's strikes to a certain amount.",
                                                )
                                                .addUserOption((option) =>
                                                    option
                                                        .setName("user")
                                                        .setDescription(
                                                            "The user to set the strikes of.",
                                                        )
                                                        .setRequired(true),
                                                )
                                                .addIntegerOption((option) =>
                                                    option
                                                        .setName("amount")
                                                        .setDescription(
                                                            "The amount of strikes to set the user's strikes to.",
                                                        )
                                                        .setRequired(true),
                                                ),
                                        ),
                                ),
                        ),
                ),
        ),

    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const subCommands = interaction.options.getSubcommand();
    },
};
