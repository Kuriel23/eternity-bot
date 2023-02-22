module.exports = async (client, interaction) => {
  await client.channels.fetch(interaction.channel.id).then((channel) => { return channel.name})
  interaction
    .reply(
      `\\🔒 |${interaction.user}, esse ticket será deletado em \`3 segundos\`...`
    )
    .then(() => {
      setTimeout(() => {
        interaction.channel.delete();
      }, 3000);
    });
};
