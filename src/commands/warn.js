const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("warn")
    .setNameLocalizations({
      "pt-BR": "advertência",
      "en-US": "warn",
    })
    .setDescription("Informe um usuário sobre o descumprimento de regras!")
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
        .setName("motivo")
        .setNameLocalizations({ "pt-BR": "motivo", "en-US": "reason" })
        .setDescription("Identifique um motivo para o aviso")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const membro = interaction.options.getMember("usuário");
    const motivo = interaction.options.getString(
      "motivo"
    )
    if (membro.id === interaction.member.id)
      return interaction.reply({ content: "Sem brincar..." });
    if (!membro)
      return interaction.reply({
        content: "Sup! Não foi encontrado um usuário dentro deste servidor.",
      });

    membro
      .send({
        content:
          "Você foi avisado por " +
          motivo +
          ". Comporte-se para não receber mais punições desse tipo.",
      })
      .catch((err) => {
        if (err) interaction.channel.send({
          content: `<@${membro.id}>, Você foi avisado por ${motivo}. Comporte-se para não receber mais punições desse tipo.`,
          ephemeral: true,
        });
      });

    interaction.reply({
      content:
        "Realizado com sucesso.",
      ephemeral: true,
    });
  },
};
