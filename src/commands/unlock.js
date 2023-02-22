const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("unlock")
    .setNameLocalizations({
      "pt-BR": "desbloquear",
      "en-US": "unlock",
    })
    .setDescription("Desbloqueie a interação de um canal.")
    .setDefaultMemberPermissions(discord.PermissionFlagsBits.ManageChannels),
  async execute(interaction, client) {
    interaction.channel.permissionOverwrites.edit(
      interaction.channel.guild.roles.everyone,
      { SendMessages: true }
    );
    interaction.reply(
      "Chat desbloqueado com sucesso, agora os membros poderão interagir novamente."
    );
  },
};
