async function loadCommands(client) {
    const { load } = require("../functions/loader");
    const ascii = require("ascii-table");
    const table = new ascii().setHeading("Command", "Load status");

    await client.commands.clear();

    let commandsArr = [];

    const files = await load("commands");
    files.forEach((file) => {
        const command = require(file);
        client.commands.set(command.data.name, command);
        commandsArr.push(command.data.toJSON());
        table.addRow(command.data.name, "✅");
    });
    client.application.commands.set(commandsArr);

    return console.log(
        table.toString(),
        `\nLoaded ${files.length} ${
            files.length === 1 ? "command" : "commands"
        } successfully!`,
    );
}

module.exports = { loadCommands };
