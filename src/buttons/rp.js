module.exports = async (client, interaction) => {
  interaction.reply({
    content: `Esta parceria foi negada por <@${interaction.member.id}>!`,
  });
  interaction.message.delete();
};
