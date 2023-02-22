const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("serverinfo")
    .setNameLocalizations({
      "pt-BR": "informação_server",
      "en-US": "serverinfo",
    })
    .setDescription("Veja informações sobre o servidor."),
  async execute(interaction, client) {
    const owner = await interaction.guild.fetchOwner();

    const embed = new discord.EmbedBuilder()
      .setColor(client.cor)
      .setThumbnail(interaction.guild.iconURL())
      .setAuthor({ name: "🔍 Informações do servidor" })
      .addFields(
        {
          name: "Nome",
          value: interaction.guild.name,
          inline: true,
        },
        {
          name: "ID",
          value: interaction.guild.id,
          inline: true,
        },
        {
          name: "Dono(a)",
          value: owner.toString(),
          inline: true,
        },
        {
          name: "Canais",
          value: interaction.guild.channels.cache.size.toString(),
          inline: true,
        },
        {
          name: "Cargos",
          value: interaction.guild.roles.cache.size.toString(),
          inline: true,
        },
        {
          name: "Humanos | Bots",
          value: `${interaction.guild.members.cache
            .filter((member) => !member.user.bot)
            .size.toString()} | ${interaction.guild.members.cache
            .filter((member) => member.user.bot)
            .size.toString()}`,
          inline: true,
        },
        {
          name: "Canal de Regras",
          value: `<#${interaction.guild.rulesChannelId}>`,
          inline: true,
        },
        {
          name: "Criado em",
          value: `${discord.time(interaction.guild.createdAt, "f")}`,
          inline: true,
        },
        {
          name: "Descrição",
          value:
            interaction.guild.description || "Servidor não possui descrição",
        }
      )
      .setTimestamp();

    interaction.reply({ embeds: [embed] });
  },
};
