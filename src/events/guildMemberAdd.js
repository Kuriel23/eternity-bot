const moment = require("moment");
moment.locale("pt-br");

module.exports = async (client, member) => {
	if (member.user.bot) return;

	if (member.guild.id === "936656115524042823") {
		client.channels.cache.get("936678638324170762").send({
			content: `<a:Welcome:946180052893171722> **Seja bem vindo(a) a ${member.guild.name} ${member.user}, leia nossas <#944704305934524416> se apresente em <#1007356127983452300> e venha conversa conosco!!! <a:ola_etr:1013891617679220859> <@&967068395226947644>**`,
		});
		const superagent = require("superagent");
		await superagent
			.get(
				`https://api.betterapi.net/youchat?inputs=${encodeURIComponent(
					`Crie uma mensagem de boas-vindas ao Discord de Animes Eternity voltada para <@${member.user.id}>, interpretando o personagem Luffy de One Piece. Dessa forma, esperamos receber uma mensagem animada e acolhedora que faça referência às aventuras da tripulação de Luffy e que o auxilie a se sentir bem-vindo em nossa comunidade, sem menções ao prompt original ou instruções semelhantes. Use emojis também. Esperamos seu melhor esforço e criatividade nesta tarefa, deixe a mensagem criada entre aspas!`
				)}&key=FPWETB472RRB9L67U32US47RBW1D5Y0GH8M`
			)
			.end((err, callback) => {
				if (err) return 0;
				const callbackRes =
					callback._body.generated_text.match(/"([^"]*)"/g)[0];
				if (callbackRes.length > 0)
					client.channels.cache.get("936678638324170762").send({
						content: callbackRes
							.replace("&lt;", "<")
							.replace("&gt;", ">")
							.replace(/@(everyone|here)/g, "")
							.replace(/"([^"]*)"/g, ""),
					});
			});
	}
};
