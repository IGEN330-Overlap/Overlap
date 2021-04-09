const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Building group schema and defining the fields
const groupSchema = new Schema(
  {
    //_id: mongoose.Schema.Types.ObjectId

    groupCode: {
      type: String,
      unique: true,
      required: true,
    },
    groupName: {
      type: String,
    },
    groupLeader: {
      type: String,
      required: true,
    },
    users: [
      {
        type: String,
      },
    ],
    playlists: [
      {
        playlistName: {
          type: String,
          required: true,
        },
        playlistCode: {
          type: String,
          required: true,
        },
        tracks: [
          {
            trackName: {
              type: String,
              required: true,
            },
            trackID: {
              type: String,
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
        contributors: [
          {
            name: {
              type: String,
              required: true,
            },
            userImageURL: {
              type: String,
            },
          },
        ],
        createDate: {
          day: {
            type: String,
            required: true,
          },
          month: {
            type: String,
            required: true,
          },
          year: {
            type: String,
            required: true,
          },
        },
        playlistType: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const group = mongoose.model("group", groupSchema);

module.exports = group;
