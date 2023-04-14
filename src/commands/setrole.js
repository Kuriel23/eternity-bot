const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("set_role")
    .setNameLocalizations({
      "pt-BR": "definir_cargo",
      "en-US": "set_role",
    })
    .setDescription("Defina um cargo!")
    .setDefaultMemberPermissions(discord.PermissionFlagsBits.Administrator)
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
    )
    .addBooleanOption((option) =>
      option
        .setName("mensal")
        .setNameLocalizations({ "pt-BR": "mensal", "en-US": "monthly" })
        .setDescription("Identifique se o cargo deve ser mensal")
        .setRequired(false)
    ),
  async execute(interaction, client) {
    const member = interaction.options.getMember("usuário");
    const role = interaction.options.getRole("cargo");
    const mensal = interaction.options.getBoolean("mensal") || false;
    if (interaction.member.roles.highest.position <= role.position)
      return interaction.reply({
        content:
          "Não tenho permissões para dar cargos com nível de administrador.",
        ephemeral: true,
      });
    const doc = await client.dbm.Guilds.findOne({ _id: "1" });
    if (doc) {
      const _date = new Date();
      _date.setMonth(_date.getMonth() + 1);
      const date = new Date(_date);
      if (mensal)
        doc.roleschedule.push({
          _id: pessoa.id,
          role: role.id,
          schedule: date,
        });
      doc.save();

      const person = interaction.guild.members.cache.get(pessoa.id);
      person.roles.add(role);

      interaction.reply({ content: "Definido com sucesso." });

      if (permanent) {
        schedule.scheduleJob(date, function () {
          person.roles.remove(role);
          doc.roleschedule.pull({ _id: pessoa.id });
          doc.save();
        });
      }
    }
  },
};
