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
            options.setName("add").setDescription("Adds a strike to the user."),
        )
        .addSubcommand((options) =>
            options
                .setName("remove")
                .setDescription("Removes a strike from the user."),
        ),
};
