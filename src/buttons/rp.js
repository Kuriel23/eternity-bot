module.exports = async (client, interaction) => {
  interaction
    .reply({
      content: `Esta parceria foi negada por <@${interaction.member.id}>!`,
    })
    .then((msg) => setTimeout(() => msg.delete(), 5000));
  interaction.message.delete();
};
