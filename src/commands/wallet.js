const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("wallet")
    .setNameLocalizations({
      "pt-BR": "carteira",
      "en-US": "wallet",
    })
    .setDescription("Veja sua carteira.")
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setNameLocalizations({ "pt-BR": "usuário", "en-US": "user" })
        .setDescription("Identifique o usuário")
        .setRequired(false)
    ),
  async execute(interaction, client) {
    const user = interaction.options.getMember("usuário") || interaction.member;
    const doc = await client.dbm.Users.findOne({ _id: user.user.id });
    if (doc) {
      interaction.reply({
        content: `${user.user.tag} têm atualmente ${doc.coins || 0} moedas.`,
      });
    } else {
      new client.dbm.Users({ _id: user.user.id }).save();
      return interaction.reply({
        content: `${user.user.tag} foi registrado no banco de dados com sucesso!`,
      });
    }
  },
};
