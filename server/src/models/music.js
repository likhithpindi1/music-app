require("../DB/connection");
const player = require("sound-play");
// var player = require("play-sound")((opts = {}));
const fs = require("fs");

const path = require("path");

const mongoose = require("mongoose");

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

  const currentSong = find.songs.find((item) => {
    return item === song;
  });

  let currentpath = path.join(
    __dirname,
    `../utilities/Albums/${Album}/${song}`
  );

  // player.play(currentpath);
  return {
    song: currentpath,
    basePath: `http://localhost:3000/api/v1/songs/${Album}/${song}`,
  };
};

const musicModel = new mongoose.model("play", musicSchema);
//end of music data

module.exports = { musicModel };

// Celebration of Vennela.mp3
// Chamkeela Angeelesi.mp3
// Chithu.mp3
// Cricket Rap.mp3
// Dhoom Dhaam Dhosthaan.mp3
// Ee Dharani.mp3
// Monna Badilo.mp3
// Oh Ammalaalo Ammalaalo.mp3
// Ori Vaari.mp3
// Silk Bar.mp3
