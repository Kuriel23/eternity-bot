const { connect, Schema, model, set } = require('mongoose');
const { ChalkAdvanced } = require("chalk-advanced");
set("strictQuery", true);
connect(process.env.db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    console.log(
      `${ChalkAdvanced.gray(">")} ${ChalkAdvanced.green(
        "✅ • Carregado com sucesso [BANCO DE DADOS]"
      )}`
    )
  )
  .catch(() =>
    console.log(
      `${ChalkAdvanced.gray(">")} ${ChalkAdvanced.red(
        "❎ • Conexão do banco de dados falhada"
      )}`
    )
  );


const guildSchema = new Schema({
  _id: { type: String, required: true },
  vipschedule: [
    {
      _id: { type: String },
      vip: { type: String },
      schedule: { type: Date },
    },
  ],
  partnerschedule: [
    {
      _id: { type: String },
      schedule: { type: Date },
    },
  ],
});

const staffsSchema = new Schema({
  _id: { type: String, required: true },
  cargo: { type: String },
  days: [
    {
      0: { type: Boolean },
      1: { type: Boolean },
      2: { type: Boolean },
      3: { type: Boolean },
      4: { type: Boolean },
      5: { type: Boolean },
      6: { type: Boolean },
    },
  ],
  ausente: [
    {
      status: { type: Boolean },
      endTime: { type: Date },
    },
  ],
  weekStatus: [
    {
      messages: { type: Number },
    },
  ],
});

const userSchema = new Schema({
  _id: { type: String, required: true },
  vips: {
    roleid: { type: String },
    rolelimit: { type: Number, default: 0 },
    channelimit: { type: Number, default: 0 },
  },
});

module.exports.Staffs = model("Staffs", staffsSchema);
module.exports.Guilds = model("Guilds", guildSchema);
module.exports.Users = model("Users", userSchema);
