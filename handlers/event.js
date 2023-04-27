async function loadEvents(client) {
    const { load } = require("../functions/loader");
    const ascii = require("ascii-table");
    const table = new ascii().setHeading("Event", "Load status");

    await client.events.clear();

    const files = await load("events");
    files.forEach((file) => {
        const event = require(file);
        const execute = (...args) => event.execute(...args, client);
        client.events.set(event.name, execute);

        if (event.rest) {
            if (event.once) client.rest.once(event.name, execute);
            else client.rest.on(event.name, execute);
        } else {
            if (event.once) client.once(event.name, execute);
            else client.on(event.name, execute);
        }

        table.addRow(event.name, "✅");
    });

    return console.log(table.toString(), "\nLoaded events successfully!");
}

module.exports = { loadEvents };
