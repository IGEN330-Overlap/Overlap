const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Building user schema and defining the fields
const userSchema = new Schema(
  {
    userID: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    imageURL: {
      type: String,
    },
    email: {
      type: String,
    },

    topTracks: [
      {
        songName: {
          type: String,
          required: true,
        },
        songID: {
          type: String,
          required: true,
        },
        songPopularity: {
          type: Number,
          required: true,
        },
        imageURL: {
          type: String,
          required: true,
        },
        linkURL: {
          type: String,
          required: true,
        },
        artistName: {
          type: String,
          required: true,
        },
      },
    ],

    topArtists: [
      {
        artistName: {
          type: String,
          required: true,
        },
        artistID: {
          type: String,
          required: true,
        },
        followerCount: {
          type: Number,
          required: true,
        },
        artistPopularity: {
          type: Number,
          required: true,
        },
        imageURL: {
          type: String,
          required: true,
        },
        linkURL: {
          type: String,
          required: true,
        },
      },
    ],

    groups: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
