require("dotenv").config();
const amqp = require("amqplib");
const PlaylistSongsService = require("./PlaylistsServices");
const MailSender = require("./MailSender");
const Listener = require("./Listener");

const init = async () => {
  const playlistSongsService = new PlaylistSongsService();
  const mailSender = new MailSender();
  const listener = new Listener(playlistSongsService, mailSender);
  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  try {
    await channel.assertQueue("export:playlists", {
      durable: true,
    });
  } catch (error) {
    console.log(error);
  }

  channel.consume("export:playlists", listener.listen, { noAck: true });
};

init();
