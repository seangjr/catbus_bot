const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Reloads your commands and events.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addSubcommand((options) =>
            options.setName("events").setDescription("Reloads your events."),
        )
        .addSubcommand((options) =>
            options
                .setName("commands")
                .setDescription("Reloads your commands."),
        ),
    execute(interaction, client) {
        switch (interaction.options.getSubcommand()) {
            case "events":
                const { loadEvents } = require("../../handlers/event");
                for (const [key, value] of client.events) {
                    client.removeListener(`${key}`, value, true);
                }
                loadEvents(client);
                interaction.reply({
                    content: "Reloaded events successfully!",
                    ephemeral: true,
                });
                break;
            case "commands":
                const { loadCommands } = require("../../handlers/command");
                loadCommands(client);
                interaction.reply({
                    content: "Reloaded commands successfully!",
                    ephemeral: true,
                });
                break;
        }
    },
};
