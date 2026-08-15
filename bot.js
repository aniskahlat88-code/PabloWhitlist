const { Client, GatewayIntentBits } = require("discord.js");
const mysql = require("mysql2");
const http = require("http");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});
const db = mysql.createPool({
    host: "51.38.205.167",
    user: "u276311_C3VjnRw7nH",
    password: "n+CT5Yt!4C@WeKe65iKedd^x",
    database: "s276311_dzlife",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
const CHANNEL_ID = "1537996649555558450";
const UNWHITELIST_CHANNEL_ID = "1537996835078148177";
const TOKEN = "MTUzODE3OTI5Nzc0MTc2Njc1OA.GNk2YO.CSwKJh9YYiSEougSXSzto07DvSHlXCB9DPXTD0";
// إضافة Whitelist
client.on("messageCreate", message => {
    if (message.channel.id !== CHANNEL_ID) return;
    if (message.author.bot) return;
    let args = message.content.trim().split(" ");
    let mentionedUser = message.mentions.users.first();
    // ❌ لازم منشن
    if (!mentionedUser) {
        return message.reply("❌ Lazem Dir Tag Wab3d Dir Serial Bla Espace");
    }
    // ⚠️ تحقق من الشكل الصحيح: @user SERIAL
    if (args.length < 2) {
        return message.reply("❌ Dir: @user SERIAL");
    }
    let serial = args[1];
    // تحقق من السيريال
    if (!serial || serial.length !== 32) {
        return message.reply("❌ Serial Machi Sahih Wla Rak Dayr Espace");
    }
    let discordMention = mentionedUser.toString();
    db.query(
        "INSERT INTO pablo_whitlist (serial, added_by, discord_id) VALUES (?,?,?)",
        [
            serial,
            message.author.username,
            discordMention
        ],
        (err) => {
            if (err) {
                return message.reply("⚠️ Serial Kayn Dija");
            }
            message.reply("✅ Rah Jah Whitlist");
        }
    );
});
// حذف Whitelist
client.on("messageCreate", message => {
    if(message.channel.id !== UNWHITELIST_CHANNEL_ID) return;
    if(message.author.bot) return;
    let args = message.content.trim().split(" ");
    if(!message.mentions.users.first()){
        return message.reply("❌ Dir Tag Wab3d Serial Bla Espace");
    }
    let serial = args[1];
    if(!serial || serial.length !== 32){
        return message.reply("❌ Serial Machi Sahih Wla Rak Dayr Escpase");
    }
    db.query(
        "DELETE FROM pablo_whitlist WHERE serial=?",
        [serial],
        (err,result)=>{
            if(err){
                return message.reply("❌ Eror In Php Admin");
            }
            if(result.affectedRows === 0){
                return message.reply("⚠️ Serial Makach");
            }
            message.reply("🗑️ Rah Tnhalo Whitlist");
        }
    );
});
http.createServer((req,res)=>{
    res.write("Bot is online");
    res.end();
}).listen(process.env.PORT || 3000);
console.log("Server started");
client.login(TOKEN);
