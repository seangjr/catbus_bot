const { glob } = require("glob");

async function load(dirName) {
    const files = await glob(
        `${process.cwd().replace(/\\/g, "/")}/${dirName}/**/*.js`,
    );
    files.forEach((file) => delete require.cache[require.resolve(file)]);
    return files;
}

module.exports = { load };
