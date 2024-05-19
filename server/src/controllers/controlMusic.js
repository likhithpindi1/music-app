const { musicModel } = require("../models/music");

const music = async function (req, res) {
  const data = await musicModel.store();

  if (data) {
    for (let i = 0; i < data.Album.length; i++) {
      for (let i = 0; i < data.songs.length; i++) {
        x = await musicModel.create({
          Album: data.Album[i],
          songs: data.songs[i],
        });
      }
      break;
    }
  }
  let userdata = await musicModel.find();
  res.status(200).json(userdata);
};
const play = async function (req, res) {
  const { Album, song } = req.body;
  const { basePath } = await musicModel.toPlay(Album, song);

  console.log(basePath);

  res.status(200).json(basePath);
};

module.exports = { music, play };
