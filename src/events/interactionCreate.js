module.exports = (client, interaction) => {
  if (interaction.isStringSelectMenu()) {
    require("../menu/" + interaction.values[0])(client, interaction);
  }
  if (interaction.isButton()) {
    if (interaction.customId.endsWith("confirm")) return;
      require("../buttons/" + interaction.customId)(client, interaction);
    }
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
      command.execute(interaction, client);
    } catch (err) {
      if (err) console.error(err);
      interaction.reply({
        content: "Um erro foi executado no meu grande algoritmo.",
        ephemeral: true,
      });
    }
  }
};
