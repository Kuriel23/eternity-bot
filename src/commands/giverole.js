const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("giverole")
    .setNameLocalizations({
      "pt-BR": "dar_cargo",
      "en-US": "giverole",
    })
    .setDescription("Alguém mereceu levar uma martelada!")
    .setDefaultMemberPermissions(discord.PermissionFlagsBits.ManageRoles)
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setNameLocalizations({ "pt-BR": "usuário", "en-US": "user" })
        .setDescription("Identifique o utilizador")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("cargo")
        .setNameLocalizations({ "pt-BR": "cargo", "en-US": "role" })
        .setDescription("Identifique um cargo")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const member = interaction.options.getMember("usuário");
    const role = interaction.options.getRole("cargo");
    if (interaction.member.roles.highest.position <= role.position)
      return interaction.reply({
        content:
          "Não tenho permissões para dar cargos com nível de administrador.",
        ephemeral: true,
      });
    await member.roles.add(role).then(() => {
      return interaction.reply({
        content: `<@${member.id}> foi dado o cargo <@&${role.id}>.`,
        ephemeral: true,
      });
    });
  },
};
