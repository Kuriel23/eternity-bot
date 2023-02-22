const discord = require("discord.js");
const ms = require("ms-pt-br");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("mute")
    .setNameLocalizations({
      "pt-BR": "silenciar",
      "en-US": "mute",
    })
    .setDescription("Castigar um usuário!")
    .setDefaultMemberPermissions(discord.PermissionFlagsBits.ModerateMembers)
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setNameLocalizations({ "pt-BR": "usuário", "en-US": "user" })
        .setDescription("Identifique o utilizador")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("tempo")
        .setNameLocalizations({ "pt-BR": "tempo", "en-US": "time" })
        .setDescription("Identifique um tempo (Ex: 1h, 1m, 1s)")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("motivo")
        .setNameLocalizations({ "pt-BR": "motivo", "en-US": "reason" })
        .setDescription("Identifique um motivo para o aviso")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const member = interaction.options.getMember("usuário");
    const reason =
      interaction.options.getString("motivo") +
        " - Punido por: " +
        interaction.member.user.tag ||
      "Punido por: " + interaction.member.user.tag;
    const time = ms(interaction.options.getString("tempo"));

    if (!time)
      return interaction.reply({
        content:
          "O tempo que foi dado não é válido. Você deve usar d para dias, h para horas e m para minutos.",
      });
    await member.timeout(time, reason).catch((error) => {
      if (error) return interaction.reply({
        content: "É impossível realizar tal ação contra este usuário.",
      });
    });
    const embban = new discord.EmbedBuilder()
      .setTitle(member.user.tag + " | Mute")
      .setColor(client.cor)
      .addField("Usuário", `${member.user.tag} (${member.id})`, true)
      .addField(
        "Moderador",
        `${interaction.member.tag} (${interaction.member.id})`,
        true
      )
      .addField("Tempo", ms(time, { long: true }), true);
    client.channels.cache.get("944721146971033650").send({ embeds: [embban] });
    return interaction.reply({
      content: `${member} foi mutado por ${ms(time, { long: true })}`,
    });
  },
};
