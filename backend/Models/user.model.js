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
    musicalProfile:{
      trackPopularity:{
        type: Number,
        required: true
      },
      danceability: {
        type: Number,
        required: true
      },
      energy: {
        type: Number,
        required: true
      },
      speechiness: {
        type: Number,
        required: true
      },
      acoustiness: {
        type: Number,
        required: true
      },
      instrumentalness: {
        type: Number,
        required: true
      },
      valence: {
        type: Number,
        required: true
      },
    },
    topGenres: [
      {
        genre: {
          type: String,
        },
        count: {
          type: Number,
        },
      },
    ],
    topTracks: [
      {
        trackName: {
          type: String,
          required: true,
        },
        trackID: {
          type: String,
          required: true,
        },
        trackPopularity: {
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
        // Relevant Audio Features
        danceability: {
          type: Number,
          required: true
        },
        energy: {
          type: Number,
          required: true
        },
        speechiness: {
          type: Number,
          required: true
        },
        acoustiness: {
          type: Number,
          required: true
        },
        instrumentalness: {
          type: Number,
          required: true
        },
        valence: {
          type: Number,
          required: true
        },
        duration_ms: {
          type: Number,
          required: true
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
