require("../DB/connection");
const player = require("sound-play");
const fs = require("fs");

const path = require("path");

const mongoose = require("mongoose");
const { time, Console } = require("console");

// music data
const musicSchema = mongoose.Schema({
  Album: {
    type: String,
  },
  songs: {
    type: Array,
  },
});
musicSchema.statics.store = async function () {
  const find = await musicModel.find();
  if (find.length === 0) {
    const currentsong = path.join(__dirname, "../utilities/Albums");

    const myAlbums = fs.readdirSync(currentsong);

    let s = "";

    let mySongs = [];

    for (let i = 0; i < myAlbums.length; i++) {
      let songsPath = currentsong + "/" + myAlbums[i];
      let allPath = fs.readdirSync(songsPath);
      mySongs.push(allPath);
    }

    let music = { Album: myAlbums, songs: mySongs };
    return music;
  } else {
    return null;
  }
};
musicSchema.statics.toPlay = async function (Album, song) {
  let find = await musicModel.findOne({ Album });
  console.log(find.songs);

  const currentSong = find.songs.filter((item) => {
    return item === song;
  });

  let currentpath = path.join(
    __dirname,
    `../utilities/Albums/${Album}/${song}`
  );

  player.play(currentpath);
  return { song: currentSong };
};

const musicModel = new mongoose.model("play", musicSchema);
//end of music data

module.exports = { musicModel };
