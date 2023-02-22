const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("unmute")
    .setNameLocalizations({
      "pt-BR": "desmutar",
      "en-US": "unmute",
    })
    .setDescription("Retire o castigo de um usuário.")
    .setDefaultMemberPermissions(discord.PermissionFlagsBits.ModerateMembers)
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setNameLocalizations({ "pt-BR": "usuário", "en-US": "user" })
        .setDescription("Identifique o usuário")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const member = interaction.options.getMember("usuário");

    await member.timeout(0, "Remoção de silenciamento").catch((error) => {
      if (error) return interaction.reply({
        content: "É impossível realizar tal ação contra este usuário.",
      });
    });
    return interaction.reply({ content: `${member} foi desmutado.` });
  },
};
