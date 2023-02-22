const { Collection } = require('discord.js');
const { ChalkAdvanced } = require("chalk-advanced");

module.exports = (client) => {
  require('./eventLoader')(client);

  client.commands = new Collection();

  /* Logging the bot in. */
  client
    .login(process.env.TOKEN)
    .then(() =>
      console.log(
        `${ChalkAdvanced.gray(">")} ${ChalkAdvanced.green(
          "✅ • Carregado com sucesso [DISCORD CLIENT]"
        )}`
      )
  );
};
