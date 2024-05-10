const { PROCESSNAME } = require("../../config");
const { command } = require("../../lib/");
const { exec } = require("child_process");
command(
  {
    pattern: "update",
    fromMe: true,
    desc: "update the bot",
    type: "user",
  },
  async (message, match) => {
    await message.sendMessage("_Updating..._");
    exec("git pull", async (error, stdout, stderr) => {
      if (error) {
        return message.sendMessage(message.jid, error.message);
      }
      if (stderr) {
        return message.sendMessage(message.jid, stderr);
      }
      message.sendMessage(message.jid, "_Updated successfully!_");
      exec("pm2 restart " + PROCESSNAME, (error, stdout, stderr) => {
        if (error) {
          return message.sendMessage(message.jid, error.message);
        }
        if (stderr) {
          return message.sendMessage(message.jid, stderr);
        }
      });
    });
  }
);