module.exports = (client, oldMember, newMember) => {
  if (oldMember.premiumSinceTimestamp !== newMember.premiumSinceTimestamp) {
    client.channels.cache.get("856883769696976916").send({
      embeds: [
        {
          title:
            "<a:florVermelho:1079413753386369114> Obrigado pelo boost, agora você virou um grande nakama do servidor",
          description: `<a:Borboleta:1079413751570255944> **Obrigado pelo impulso ${newMember}, agora você  obteve certas habilidades** assim como o demônio do sangue ${newMember} adquiriu certas habilidades e **agora é um <@&939901531254321263>, de uma lida nos** **[benefícios](https://discord.com/channels/936656115524042823/937009537175662652/1017106693982785547)** **para ficar por dentro de todas as suas habilidades** <a:firered:1079413754695004191>`,
          color: 9379615,
          image: "https://media.discordapp.net/attachments/1078043994845614162/1079892779515248681/ae_003.png?width=1171&height=624",
          footer: {
            text: "©️ 2023 永遠 Anime's Eternity Todos os direitos reservados.",
          },
        },
      ],
    });
  }
};