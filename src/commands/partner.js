const discord = require("discord.js");
const schedule = require("node-schedule");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("partner")
    .setNameLocalizations({
      "pt-BR": "parceria",
      "en-US": "partner",
    })
    .setDescription("Faça uma parceria.")
    .setDefaultMemberPermissions(discord.PermissionFlagsBits.ManageMessages)
    .addUserOption((option) =>
      option
        .setName("representante")
        .setNameLocalizations({ "pt-BR": "representante", "en-US": "rep" })
        .setDescription("Identifique o representante")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const user = interaction.options.getMember("representante");
    if (!user)
      return interaction.reply({
        content: "O representante precisa estar no servidor.",
        ephemeral: true,
      });
    const modal = new discord.ModalBuilder()
      .setCustomId("parceria" + interaction.member.id)
      .setTitle("Realizando uma parceria");
    const partnerInput = new discord.TextInputBuilder()
      .setCustomId("partnerInput")
      .setLabel("Mensagem de parceria")
      .setStyle(2);
    const secondActionRow = new discord.ActionRowBuilder().addComponents(
      partnerInput
    );
    modal.addComponents(secondActionRow);
    await interaction.showModal(modal);
    await interaction.guild.roles.fetch();

    const i = await interaction
      .awaitModalSubmit({
        time: 300000,
        filter: (i) => i.user.id === interaction.user.id,
      })
      .catch((error) => {
        if (error) return null;
      });

    if (i) {
      user.roles.add("939904131940900885");
      i.reply({ content: "Parceria feita com sucesso." });
      const partner = i.fields.getTextInputValue("partnerInput");
      const embed = new discord.EmbedBuilder()
        .setColor(client.cor)
        .setTitle("Nova Parceria!")
        .setImage("https://imgur.com/kMWd3Ow.png")
        .setDescription(
          `Agradecemos pela nova parceria!!!\nRepresentante ${
            interaction.member
          } já fez ${await client.db.get(
            interaction.member.id + ".parcerias"
          )} parcerias.`
        );
      client.channels.cache.get("1027217228514467892").send({
        content: `${partner.replace(
          /(@here|@everyone)/g,
          ""
        )}\nRepresentante: ${user}\n<@&939904145920520362>`,
        embeds: [embed],
      });
      await client.db.add(interaction.member.id + ".parcerias", 1);

      const doc = await client.dbm.Guilds.findOne({ _id: "1" });
      if (doc) {
        const _date = new Date();
        _date.setDate(_date.getDate() + 7);
        const date = new Date(_date);
        doc.partnerschedule.push({
          _id: user.id,
          schedule: date,
        });
        doc.save();

        schedule.scheduleJob(date, function () {
          interaction.guild.members.cache
            .get(user.id)
            .roles.remove("939904131940900885");
          doc.partnerschedule.pull({
            _id: user.id,
          });
          doc.save();
        });
      }
    }
  },
};
