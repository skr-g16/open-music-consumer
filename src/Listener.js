const autoBind = require("auto-bind");

class Listener {
  constructor(service, mailSender) {
    this._service = service;
    this._mailSender = mailSender;
    autoBind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(
        message.content.toString()
      );

      const playlist = await this._service.getSongsFromPlaylist(playlistId);

      await this._mailSender.SendEmail(targetEmail, JSON.stringify(playlist));
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
