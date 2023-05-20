const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { readdirSync } = require("fs");
require("dotenv").config();
const { ChalkAdvanced } = require("chalk-advanced");
const schedule = require("node-schedule");

module.exports = async (client) => {
	schedulers();

	async function schedulers() {
		const not = await client.dbm.Guilds.findOne({ _id: "1" });
		if (not) {
			not.vipschedule.forEach((vips) => {
				schedule.scheduleJob(vips.schedule, async function () {
					const cargo = client.guilds.cache
						.get("936656115524042823")
						.roles.cache.find(
							(r) =>
								r.id ===
								vips.vip
									.replace(
										"Eternity family",
										"962461093446422559"
									)
									.replace("Shinigami", "937040032718536734")
									.replace("Hunter", "937040400126984242")
									.replace("Slayer", "937039457457160322")
									.replace("Death Note", "937041568299368508")
						);

					const person = client.guilds.cache
						.get("936656115524042823")
						.members.cache.get(vips._id);
					if (person) person.roles.remove(cargo);
					await client.dbm.Guilds.findOneAndUpdate(
						{ _id: "1" },
						{ $pull: { vipschedule: { _id: vips._id } } },
						{ new: true }
					);
				});
			});
			not.partnerschedule.forEach((partner) => {
				schedule.scheduleJob(partner.schedule, async function () {
					const person = client.guilds.cache
						.get("936656115524042823")
						.members.cache.get(partner._id);
					if (person) person.roles.remove("939904131940900885");
					await client.dbm.Guilds.findOneAndUpdate(
						{ _id: "1" },
						{ $pull: { partnerschedule: { _id: partner._id } } },
						{ new: true }
					);
				});
			});
			not.roleschedule.forEach((role) => {
				schedule.scheduleJob(role.schedule, async function () {
					const person = client.guilds.cache
						.get("936656115524042823")
						.members.cache.get(role._id);
					if (person) person.roles.remove(role.role);
					await client.dbm.Guilds.findOneAndUpdate(
						{ _id: "1" },
						{ $pull: { roleschedule: { _id: role._id } } },
						{ new: true }
					);
				});
			});
		}
	}

	// schedule.scheduleJob("0 */1 * * *", async function () {
	/*  const totalDocumentos = await client.dbm.Questions.countDocuments();

    const numeroAleatorio = Math.floor(Math.random() * totalDocumentos);

    const doc = await client.dbm.Questions.findOne()
      .skip(numeroAleatorio)
      .limit(1);
    if (!doc) return 0;
    client.channels.cache
      .get("936678638324170762")
      .send({
        content: `# ${doc._id}\n\n* Pergunta de nível ${doc.difficulty
          .replace("Easy", "Fácil")
          .replace("Medium", "Médio")
          .replace("Hard", "Difícil")}`,
      })
      .then((msg) => {
        msg.channel
          .awaitMessages({
            filter: (message) => {
              return doc.answer.toLowerCase() === message.content.toLowerCase();
            },
            max: 1,
            time: 300000,
            errors: ["time"],
          })
          .then(async (collected) => {
            collected.reply(
              `Acertou a resposta! Obrigado pela participação de todos.`
            );
            const docuser = await client.dbm.Users.findOne({
              _id: collected.first().author.id,
            });
            if (docuser) {
              docuser.coins += 10;
              docuser.save();
            } else
              new client.dbm.Users({
                _id: collected.first().author.id,
                coins: 10,
              }).save();
          })
          .catch((collected) => {
            msg.reply("Parece que ninguém acertou a tempo.");
          });
      });
  }); */

	const commandFiles = readdirSync("./src/commands/").filter((file) =>
		file.endsWith(".js")
	);

	async function memberCount() {
		const guild = client.guilds.cache.get("936656115524042823");
		const emojis = [
			"<a:number1_ae:1083168528569479218>",
			"<a:number2_ae:1083168556964909187>",
			"<a:number3_ae:1083168552099524688>",
			"<a:number4_ae:1083168547129278585>",
			"<a:number5_ae:1083168541722808420>",
			"<a:number6_ae:1083168561624793108>",
			"<a:number7_ae:1083168532738609203>",
			"<a:number8_ae:1083168536685449296>",
			"<a:number9_ae:1083168564623716422>",
			"<a:number0_ae:1083168569556221972>",
		];
		const numeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
		const numero = guild.memberCount;
		const array = numero.toString().split("");
		let x = "";
		for (let i = 0; i < array.length; i++) {
			const index = numeros.indexOf(array[i]);
			x = x + emojis[index];
		}
		guild.channels.cache
			.get("936678638324170762")
			.setTopic(
				`**__<a:hello_etr:1035697482002346004>Atualmente temos ${x} Membros no 永遠 Anime's Eternity #10k__**`,
				"Contador de membros"
			);
	}

	setInterval(memberCount, 300000);
	memberCount();
	const commands = [];

	for (const file of commandFiles) {
		const command = require(`../commands/${file}`);
		commands.push(command.data.toJSON());
		client.commands.set(command.data.name, command);
	}

	const rest = new REST({
		version: "10",
	}).setToken(process.env.TOKEN);

	(async () => {
		try {
			if (process.env.STATUS === "PRODUCTION") {
				// If the bot is in production mode it will load slash commands for all guilds
				await rest.put(Routes.applicationCommands(client.user.id), {
					body: commands,
				});
				console.log(
					`${ChalkAdvanced.gray(">")} ${ChalkAdvanced.green(
						"Sucesso registrado comandos globalmente"
					)}`
				);
			} else {
				await rest.put(
					Routes.applicationGuildCommands(
						client.user.id,
						process.env.GUILD_ID
					),
					{
						body: commands,
					}
				);

				console.log(
					`${ChalkAdvanced.gray(">")} ${ChalkAdvanced.green(
						"Sucesso registrado comandos localmente"
					)}`
				);
			}
		} catch (err) {
			if (err) console.error(err);
		}
	})();
	client.user.setPresence({
		activities: [
			{ name: `Recrutando Staffs Para o 永遠 Anime's Eternity`, type: 0 },
		],
		status: "dnd",
	});
};
