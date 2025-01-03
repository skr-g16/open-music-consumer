const nodemailer = require("nodemailer");

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  SendEmail(targetEmail, content) {
    const message = {
      from: "Open Music Apps",
      to: targetEmail,
      subject: "Ekspor Lagu Playlist",
      text: "Terlampir hasil dari ekspor lagu playlist",
      attachments: [
        {
          filename: "playlistSongs.json",
          content,
        },
      ],
    };
    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
