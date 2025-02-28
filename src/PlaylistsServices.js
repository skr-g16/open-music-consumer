const { Pool } = require("pg");

class PlaylistSongsService {
  constructor() {
    this._pool = new Pool();
  }

  async getSongsFromPlaylist(playlistId) {
    const playlistQuery = {
      text: "SELECT id, name FROM playlists WHERE id = $1",
      values: [playlistId],
    };
    const playlistResult = await this._pool.query(playlistQuery);
    const songQuery = {
      text: `SELECT songs.id, songs.title, songs.performer
            FROM playlist_songs
            LEFT JOIN songs ON songs.id = playlist_songs.song_id
            WHERE playlist_songs.playlist_id = $1`,
      values: [playlistId],
    };
    const songResult = await this._pool.query(songQuery);
    const result = {
      playlist: {
        ...playlistResult.rows[0],
        songs: songResult.rows,
      },
    };
    return result;
  }
}
module.exports = PlaylistSongsService;
