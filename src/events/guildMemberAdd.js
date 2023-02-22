const moment = require("moment");
moment.locale("pt-br");

module.exports = async (client, member) => {
  if (member.user.bot) return;

  if (member.guild.id === "936656115524042823") {
    client.channels.cache.get("936678638324170762").send({
      content: `<a:Welcome:946180052893171722> **Seja bem vindo(a) ao ${member.guild.name} <@${member.user.id}>, leia nossas <#944704305934524416> se apresente em <#1007356127983452300> e venha conversa conosco!!! <a:ola_etr:1013891617679220859> <@&967068395226947644>**`,
    });
  }
};
