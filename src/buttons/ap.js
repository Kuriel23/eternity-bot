const discord = require("discord.js");
const schedule = require("node-schedule");
module.exports = async (client, interaction) => {
  interaction.reply({
    content: `Esta parceria foi aceite por <@${interaction.member.id}>!`,
  });
  const embed = new discord.EmbedBuilder()
    .setColor(client.cor)
    .setTitle("Nova Parceria!")
    .setImage("https://i.imgur.com/R3b9YGf.png")
    .setDescription(
      `Agradecemos pela nova parceria!!!\nRepresentante ${
        interaction.member
      } já fez ${await client.db.get(
        interaction.member.id + ".parcerias"
      )} parcerias.`
    );
  await client.db.add(interaction.member.id + ".parcerias", 1);
  client.channels.cache.get("1027217228514467892").send({
    content:
      interaction.message.content
        .toString()
        .replace(/`+/g, "")
        .replace("<@&940072769624875119>", "") + " <@&939904145920520362>",
    embeds: [embed],
  });

  const idRegex = /<@([0-9]+)>/;
  const id =
    interaction.message.content
      .toString()
      .replace(/`+/g, "")
      .replace("<@&940072769624875119>", "") +
    " <@&939904145920520362>".match(idRegex)[1];
  const doc = await client.dbm.Guilds.findOne({ _id: "1" });
  if (doc) {
    const _date = new Date();
    _date.setDate(_date.getDate() + 7);
    const date = new Date(_date);
    doc.partnerschedule.push({
      _id: id,
      schedule: date,
    });
    doc.save();

    schedule.scheduleJob(date, function () {
      interaction.guild.members.cache
        .get(id)
        .roles.remove("939904131940900885");
      doc.partnerschedule.pull({
        _id: id,
      });
      doc.save();
    });
  }
};
