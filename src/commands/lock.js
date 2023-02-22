const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("lock")
    .setNameLocalizations({
      "pt-BR": "bloquear",
      "en-US": "lock",
    })
    .setDescription("Bloqueie a interação de um canal.")
    .setDefaultMemberPermissions(discord.PermissionFlagsBits.ManageChannels),
  async execute(interaction, client) {
    interaction.channel.permissionOverwrites.edit(
      interaction.channel.guild.roles.everyone,
      { SendMessages: false }
    );
    interaction.reply(
      "Chat bloqueado com sucesso, use ``unlock`` para desbloquear o canal."
    );
  },
};
