const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("botinfo")
    .setNameLocalizations({
      "pt-BR": "informação_bot",
      "en-US": "botinfo",
    })
    .setDescription("Veja informações sobre o bot."),
  async execute(interaction, client) {
    function format(seconds) {
      function pad(s) {
        return (s < 10 ? "0" : "") + s;
      }
      const hours = Math.floor(seconds / (60 * 60));
      const minutes = Math.floor((seconds % (60 * 60)) / 60);
      seconds = Math.floor(seconds % 60);

      return pad(hours) + "h" + pad(minutes) + "m" + pad(seconds) + "s";
    }

    const uptime = process.uptime();

    const embed = new discord.EmbedBuilder()
      .setColor(client.cor)
      .setThumbnail(interaction.guild.iconURL())
      .setTitle("🔍 Informações do bot")
      .addFields(
        {
          name: "**Nome**",
          value: client.user.username,
          inline: true,
        },
        {
          name: "**ID**",
          value: client.user.id,
          inline: true,
        },
        {
          name: "**Desenvolvedor**",
          value: `[Kuriel#1411](https://kurieldev.tk)`,
          inline: true,
        },
        {
          name: "**Criado em**",
          value: "<t:1655434800:D>",
          inline: true,
        },
        {
          name: "**Uptime**",
          value: format(uptime),
          inline: true,
        }
      )
      .setTimestamp();

    interaction.reply({ embeds: [embed] });
  },
};
