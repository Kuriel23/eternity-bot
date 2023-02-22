const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("view_partners")
    .setNameLocalizations({
      "pt-BR": "ver_parcerias",
      "en-US": "view_partners",
    })
    .setDescription("Veja parcerias de um usuário.")
    .setDefaultMemberPermissions(discord.PermissionFlagsBits.ManageMessages)
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setNameLocalizations({ "pt-BR": "usuário", "en-US": "user" })
        .setDescription("Identifique o usuário")
    ),
  async execute(interaction, client) {
    const user = interaction.options.getMember("usuário") || interaction.member;
    const quantia = await client.db.get(user.id + ".parcerias");
    interaction.reply({
      content: `${user.user.tag} fez ${quantia} parcerias.`,
    });
  },
};
