const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
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
        schedule.scheduleJob(vips.schedule, function () {
          const cargo = vips.vip
            .replace("Shinigami", "937040032718536734")
            .replace("Hunter", "937040400126984242")
            .replace("Slayer", "937039457457160322")
            .replace("Death Note", "937041568299368508");

          const person = client.guilds.cache
            .get("936656115524042823")
            .members.cache.get(vips._id);
          person.roles.remove(cargo);
          not.vipschedule.pull({ _id: vips._id });
        });
      });
      not.partnerschedule.forEach((partner) => {
        schedule.scheduleJob(partner.schedule, function () {
          const person = client.guilds.cache
            .get("936656115524042823")
            .members.cache.get(partner._id);
          person.roles.remove("939904131940900885");
          not.partnerschedule.pull({ _id: partner._id });
        });
      });
      await not.save();
    }
  }

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
      .get("675087693474168864")
      .setTopic(
        `**__<a:hello_etr:1035697482002346004>Atualmente temos ${x} Membros no 永遠 Anime's Eternity #10k__**`,
        "Contador de membros"
      );
  }

  setInterval(memberCount(), 300000);
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
          Routes.applicationGuildCommands(client.user.id, process.env.GUILD_ID),
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
