const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

let User = require("../Models/user.model");
let Group = require("../Models/group.model");
let Scripts = require("../scripts.js");

const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret
const backend_url = process.env.BACKEND_URL;

const redirect_uri = backend_url + "callback"; // Your redirect uri

const happy = require("../Moods/happy.json");
const chill = require("../Moods/chill.json");
const party = require("../Moods/party.json");
const sad = require("../Moods/sad.json")

// instantiate spotifyApi object
var spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uri,
});

/**
 * POST generate group top playlists
 *
 * @param {*} req { refreshToken: String, userIDs: [Strings], groupCode: String}
 * @param {*} res 
 */
exports.generateGroupsTopPlaylist = async (req, res) => {
  let usersTopTracks = []; // stores each users top tracks as a single item
  let usersTopArtists = []; // stores each users top artists as an item in the array
  let usersMusicalProfile = []; // stores each users musical proifles as single item
  spotifyApi.setRefreshToken(req.body.refreshToken); // set refresh token

  let userIDs = req.body.userIDs.map((id) => {
    return id;
  });

  // minor error handling THIS SHOULD BE PREVENTED ON THE FRONT END THOUGH
  try {
    if (userIDs.length == 0) {
      throw new Error();
    }
  } catch (e) {
    console.log("Attempted to pass no user ids to create a playlist");
    res.json({
      message: "Cannot create a group with zero other users",
      error: e
    })
  }

  let numUsers = userIDs.length; // keep track of number of users
  console.log("Users", userIDs); //debugging

  // Collect user top track data into top tracks array
  try {
    let data = await User.find({ userID: { $in: userIDs } });

    // Add each persons dataset to our master array for the corresponding thing
    usersTopTracks = data.map(x => x.topTracks);
    usersMusicalProfile = data.map(x => x.musicalProfile);
    usersTopArtists = data.map(x => x.topArtists);

  } catch (err) {
    res.json({ message: "error on finding users", error: err });
  }

  console.log("top track profiles collected:", usersTopTracks.length); //debugging

  let masterSetTracks = []; //stores all top tracks as an item
  let masterSetArtists = []; //Array to store every artist from total group
  let findDuplicatesArr = []; //stores all track IDs as an item

  // put all the songs into one array, the master set
  for (x of usersTopTracks) {
    for (data of x) {
      masterSetTracks.push({
        data,
        identifier: data.trackName + " " + data.artistName,
      });
      findDuplicatesArr.push(data.trackName + " " + data.artistName);
    }
  }

  // switch to Arr.flat() since its cleaner code if we get the chance
  // Put all the artists into one array (master set)
  for (x of usersTopArtists) {
    for (data of x) {
      masterSetArtists.push(data.artistID);
    }
  }

  console.log("masterset length", masterSetTracks.length); //debugging

  /* Let's algorithm: This is making a 30 song playlist 
    NOTE: what happens if one person is in the group and tries to make a playlist?????
    algo off the top of my head would no likey, needs small adjustment at top of this block of ifs 
  */

  let playlistTracks = []; // Array to store songs to be added to playlist
  let duplicateBasedSongs = []; // array to store the tracks of our playlist
  let recommendations = []; // Array to store the recommendations

  // Count occurences of songs in master set
  let counts = findDuplicatesArr.reduce((a, c) => {
    a[c] = (a[c] || 0) + 1;
    return a;
  }, {});

  // find max count of common occurences in the masterID set
  let maxCountTracks = Math.max(...Object.values(counts));

  // If there are at least 2 users and max count occurs in at least half the users
  if (numUsers == 2 && maxCountTracks == 2) {
    // filters for songs that appear the same amount of times as maxCount
    let mostFrequentTracks = Object.keys(counts).filter(
      (k) => counts[k] === maxCountTracks
    );
    // Each nested if block in this set of if/elif statements does the same thing
    // add up to first 10 tracks if there are that many
    duplicateBasedSongs = mostFrequentTracks.slice(0, 10);

    // If there are less than 7 users add if maxCount > (half the users rounded up)
  } else if (
    numUsers <= 7 && numUsers > 2 &&
    maxCountTracks >= numUsers - Math.floor(numUsers / 2)
  ) {
    // A song must appear a minimum in 1/2 the users (half+1) if the num users in group is odd
    let numOccurencesOfSongsToAdd = numUsers - Math.floor(numUsers / 2);

    // filters for songs that appear the same amount of times as (numusers/2 +1) or more
    let mostFrequentTracks = Object.keys(counts).filter(
      (k) => counts[k] >= numOccurencesOfSongsToAdd
    );

    duplicateBasedSongs = mostFrequentTracks.slice(0, 10);

    // If there are more than 7 users add if maxCount > (half the users rounded down)
  } else if (
    numUsers > 7 &&
    maxCountTracks >= numUsers - Math.ceil(numUsers / 2)
  ) {
    // A song must appear a minimum in 1/2 the users (half-1) if the num users in group is odd
    let numOccurencesOfSongsToAdd = numUsers - Math.ceil(numUsers / 2);

    // filters for songs that appear the same amount of times as (numusers/2 -1) or more
    let mostFrequentTracks = Object.keys(counts).filter(
      (k) => counts[k] >= numOccurencesOfSongsToAdd
    );

    duplicateBasedSongs = mostFrequentTracks.slice(0, 10);
  }
  // Using track sounds to add the rest of the songs
  // To implement (BETTER WAYS possibly)
  let groupsMusicalProfile = Scripts.calculateMusicalProfile(usersMusicalProfile);
  // console.log("groups musical profile", groupsMusicalProfile);

  // Remove all duplicates and add to the new array groupUniqueSet
  let groupUniqueSet = masterSetTracks.filter(
    (v, i, a) => a.findIndex((t) => t.identifier === v.identifier) === i
  );

  // TO IMPLEMENT, parameters to adjust which attribute has largest impacts
  let attributeAdjust = [1, 1, 1, 1];

  // calculate differences between each attribute and a song
  // add new prop "deltaFromGroup" which acts as an all in one ranking against the groups listening habits
  for (var i = 0; i < groupUniqueSet.length; i++) {
    groupUniqueSet[i]["deltaFromGroup"] =
      attributeAdjust[0] * Math.abs(
        groupUniqueSet[i].data.trackPopularity - groupsMusicalProfile.trackPopularity) +
      attributeAdjust[1] * Math.abs(
        groupUniqueSet[i].data.danceability - groupsMusicalProfile.danceability) +
      attributeAdjust[2] * Math.abs(
        groupUniqueSet[i].data.energy - groupsMusicalProfile.energy) +
      attributeAdjust[3] *
      Math.abs(groupUniqueSet[i].data.valence - groupsMusicalProfile.valence);
    //   Math.abs(x."SOME ATTRIBUTE" - groupsMusicalProfile."SOME ATTRIBUTE") ...
  }

  // Sort the unique set by the deltaFromGroup to (lowest to highest)
  // Lowest is the best
  let sortedTrackSet = groupUniqueSet.sort((a, b) => {
    return parseFloat(a.deltaFromGroup) - parseFloat(b.deltaFromGroup);
  });

  // Parses master set and adds the generate playlist tracks and the necessary info too
  // add the commonly occuring songs and the relevant props, can definitely be optimized
  var i, j = 0;
  for (i = 0; j < duplicateBasedSongs.length; i++) {
    // trackIDs match then add the corresponding data

    if (duplicateBasedSongs[j] == groupUniqueSet[i].identifier) {
      playlistTracks.push({
        trackName: groupUniqueSet[i].data.trackName,
        trackID: groupUniqueSet[i].data.trackID,
        imageURL: groupUniqueSet[i].data.imageURL,
        linkURL: groupUniqueSet[i].data.linkURL,
        artistName: groupUniqueSet[i].data.artistName,
        identifier: groupUniqueSet[i].data.trackName + " " + groupUniqueSet[i].data.artistName,
      });
      // iterate to next track and reset the master to retraverse from left
      j++;
      i = 0;
    } else if (i >= groupUniqueSet.length) {
      break; // WE HAVE AN ERROR
    }
  }

  // purely trackIDs of duplicate songs for the recommendation seed
  let mostFrequentTracks = playlistTracks.map(x => x.trackID);

  // Count occurences of songs in master set of artists
  counts = masterSetArtists.reduce((a, c) => {
    a[c] = (a[c] || 0) + 1;
    return a;
  }, {});

  // get max count of artists
  let maxCountArtists = Math.max(...Object.values(counts));

  // filters for songs that appear the same amount of times as (numusers/2 +1) or more
  let mostFrequentArtists = Object.keys(counts).filter(
    (k) => counts[k] == maxCountArtists
  );

  // debugging
  console.log("max count tracks is: ", maxCountTracks);

  // console.log("frequent artists", mostFrequentArtists);
  // console.log("frequent tracks", mostFrequentTracks);

  // must have at least a single commonality to generate a viable seed based on the duplicates
  // otherwise use the best 3 matching songs to the group profile
  if (maxCountArtists == 1 || maxCountTracks == 1) {
    let sortedTrackSeed = []; // used to get seed for non duplicates
    for (var i = 0; i < 3; i++) {
      sortedTrackSeed.push(sortedTrackSet[i].data.trackID);
    }

    try {
      let data = await spotifyApi.refreshAccessToken();
      spotifyApi.setAccessToken(data.body.access_token);

      try {
        // get spotify data based on the groups profile
        let data = await spotifyApi.getRecommendations({
          target_danceability: musicalProfile.danceability / 100,
          target_energy: musicalProfile.energy / 100,
          target_valence: musicalProfile.valence / 100,
          min_popularity: 50,
          seed_tracks: sortedTrackSeed.slice(0, 5),
        });

        // add the songs ensuring that their type is correct and that there is populated data
        for (x of data.body.tracks) {
          if (x.type == "track" && x.album.images.length != 0) {
            recommendations.push({
              trackName: x.name,
              trackID: x.id,
              imageURL: x.album.images[0].url,
              linkURL: x.external_urls.spotify,
              artistName: x.artists[0].name,
              identifier: x.name + " " + x.artists[0].name,
            });
          }
        }
      } catch (err) {
        res.json(err);
      }
    } catch (err) {
      res.json(err);
    }
  } else if (maxCountArtists != 1 || maxCountTracks != 1) {
    try {
      let data = await spotifyApi.refreshAccessToken();
      spotifyApi.setAccessToken(data.body.access_token);

      try {
        // Get recommendations for the group
        let data;

        // select seed based on whichever provides more information
        // prioritize tracks seed as shown by the non inclusive conditional
        if (maxCountArtists > maxCountTracks) {
          data = await spotifyApi.getRecommendations({
            target_danceability: musicalProfile.danceability / 100,
            target_energy: musicalProfile.energy / 100,
            target_valence: musicalProfile.valence / 100,
            min_popularity: 50,
            seed_artists: mostFrequentArtists.slice(0, 5),
          });
        } else {
          data = await spotifyApi.getRecommendations({
            target_danceability: musicalProfile.danceability / 100,
            target_energy: musicalProfile.energy / 100,
            target_valence: musicalProfile.valence / 100,
            min_popularity: 50,
            seed_tracks: mostFrequentTracks.slice(0, 5),
          });
        }

        // add the songs ensuring that their type is correct and that there is populated data
        for (x of data.body.tracks) {
          if (x.type == "track" && x.album.images.length != 0) {
            recommendations.push({
              trackName: x.name,
              trackID: x.id,
              imageURL: x.album.images[0].url,
              linkURL: x.external_urls.spotify,
              artistName: x.artists[0].name,
              identifier: x.name + " " + x.artists[0].name,
            });
          }
        }
      } catch (err) {
        res.json(err);
      }
    } catch (err) {
      res.json(err);
    }
  }

  // Add all the recommendation songs from spotify until the playlist has 20 songs
  // To implement verify that we're adding a song that is not already in the playlist
  for (var i = 0; playlistTracks.length < 23; i++) {
    // We have added all the reccomendations so break from loop
    if (i == recommendations.length) {
      break;
      // Add an attribute songs so long as they don't already exist in duplicates
    } else if (!playlistTracks.some((e) => e.identifier == recommendations[i].identifier)) {
      playlistTracks.push({
        trackName: recommendations[i].trackName,
        trackID: recommendations[i].trackID,
        imageURL: recommendations[i].imageURL,
        linkURL: recommendations[i].linkURL,
        artistName: recommendations[i].artistName,
        identifier: recommendations[i].trackName + " " + recommendations[i].artistName,
      });
    }
  }

  // Add all the attribute based songs adding from lowest to highest until we satisfy our playlist size
  // To implement verify that we're adding a song that is not already in the playlist
  for (var i = 0; playlistTracks.length < 30; i++) {

    if (i == sortedTrackSet.length) {
      break; // if we have already added all the sorted tracks then break 
    }
    // Add an attribute songs so long as they don't already exist in duplicates
    else if (!playlistTracks.some((e) => e.identifier == sortedTrackSet[i].identifier)) {
      playlistTracks.push({
        trackName: sortedTrackSet[i].data.trackName,
        trackID: sortedTrackSet[i].data.trackID,
        imageURL: sortedTrackSet[i].data.imageURL,
        linkURL: sortedTrackSet[i].data.linkURL,
        artistName: sortedTrackSet[i].data.artistName,
        identifier: sortedTrackSet[i].data.trackName + " " + sortedTrackSet[i].data.artistName,
      });
    }
  }

  //debugging
  console.log("duplicate based songs added: ", duplicateBasedSongs.length);

  /* End of algorithm */

  // Concatenate the duplicates and attribute based songs into one playlist
  // Remove identifier property
  playlistTracks.map((item) => {
    delete item.identifier;
    return item;
  });

  // Create playlist object which will be uploaded to the group, passed to MongoDB
  playlist = {
    playlistName: req.body.playlistName,
    tracks: playlistTracks,
  };

  // Update playlist to the group
  // Note: no error is thrown when the groupCode is incorrect / dne
  try {
    await Group.updateOne(
      { groupCode: req.body.groupCode },
      { $addToSet: { playlists: playlist } }
    );
    res.json({
      message: "added playlist to the group",
      playlist: playlist,
    });
  } catch (err) {
    res.json({
      message: "Unable to add playlist to the group",
      error: err,
    });
  }
};

/**
 * 
 * @param {*} req { refreshToken: String, userIDs: [String], selectedMood: String}
 * @param {*} res 
 */
exports.generateGroupsMoodsPlaylist = async (req, res) => {

  // Set moods based on the request
  let moodParams;

  try {
    if (req.body.selectedMood === "party") {
      moodParams = party;
    } else if (req.body.selectedMood === "happy") {
      moodParams = happy;
    } else if (req.body.selectedMood === "chill") {
      moodParams = chill;
    } else if(req.body.selectedMood === "sad") {
      moodParams = sad;
    } else {
      throw new Error();
    }
  } catch (e) {
    console.log("tried to generate mood playlist without selected mood");
    res.json({
      message: "no selected mood",
      error: e,
    });
  }

  // get the userIDs 
  let userIDs;
  // set users so long as there is at least 1 user sent
  try {
    // add users from request body
    userIDs = req.body.userIDs.map((id) => {
      return id;
    });

    if (userIDs.length == 0) {
      throw new Error();
    }

  } catch (e) {
    console.log("Attempted to pass no user ids to create a playlist");
    res.json({
      message: "Cannot create a group with zero other users",
      error: e
    })
  }

  console.log("Users", userIDs); //debugging

  let usersTopTracks = []; // arrays for storing user track information
  let usersTopArtists = []; // arrays for storing user artist information

  // Collect user top "x" data from mongoDB
  try {
    let data = await User.find({ userID: { $in: userIDs } });

    // Add each persons dataset to our master array for the corresponding thing
    usersTopTracks = data.map(x => x.topTracks);
    usersTopArtists = data.map(x => x.topArtists);

  } catch (err) {
    res.json({ message: "error on finding users", error: err });
  }
  // set tracks into one array
  let masterTopTracks = usersTopTracks.flat();
  
  // calculate differences between each attribute and a song
  // add new prop "deltaFromGroup" which acts as an all in one ranking against the groups listening habits
  for (var i = 0; i < masterTopTracks.length; i++) {
    masterTopTracks[i]["delta"] =
      Math.abs(masterTopTracks[i].danceability - moodParams.target_danceability) +
      Math.abs(masterTopTracks[i].energy - moodParams.target_energy) +
      Math.abs(masterTopTracks[i].valence - moodParams.target_valence);
    // console.log(masterTopTracks[i])
  }

    // Sort the unique set by the deltaFromGroup to (lowest to highest)
  // Lowest is the best
  let sortedTrackSet = masterTopTracks.sort((a, b) => {
    return parseFloat(a.delta) - parseFloat(b.delta);
  });

  let seedTracks = sortedTrackSet.map(x => x.trackID).slice(0,5)
  console.log(sortedTrackSet.map(x => x.delta).slice(0,5))

  // set artists into one array
  let masterTopArtists = usersTopArtists.flat();
  masterTopArtists = masterTopArtists.map(x => x.artistID);

  // Count occurences of songs in master set
  let counts = masterTopArtists.reduce((a, c) => {
    a[c] = (a[c] || 0) + 1;
    return a;
  }, {});

  // get max count of artists
  let maxCountArtists = Math.max(...Object.values(counts));

  // filters for songs that appear the same amount of times as (numusers/2 +1) or more
  let mostFrequentArtists = Object.keys(counts).filter(
    (k) => counts[k] == maxCountArtists
  );

  let recommendations = [];

  spotifyApi.setRefreshToken(req.body.refreshToken); // set refresh token
  try {
    let data = await spotifyApi.refreshAccessToken();
    spotifyApi.setAccessToken(data.body.access_token);

    try {
      // Get recommendations for the group
      let data;

      let recommendationsBody = moodParams;
      // recommendationsBody["seed_artists"] = mostFrequentArtists.slice(0,5);
      recommendationsBody["seed_tracks"] = seedTracks.slice(0,5);
      console.log(recommendationsBody);

      // select seed based on whichever provides more information
      // prioritize tracks seed as shown by the non inclusive conditional
      data = await spotifyApi.getRecommendations(recommendationsBody);
      // console.log(data.body.tracks)
      // console.log(data.body)

      // add the songs ensuring that their type is correct and that there is populated data
      for (x of data.body.tracks) {
        if (x.type == "track" && x.album.images.length != 0) {
          recommendations.push({
            trackName: x.name,
            trackID: x.id,
            // imageURL: x.album.images[0].url,
            // linkURL: x.external_urls.spotify,
            artistName: x.artists[0].name,
            // identifier: x.name + " " + x.artists[0].name,
          });
        }
      }
    } catch (err) {
      res.json(err);
    }
  } catch (err) {
    res.json(err);
  }

  res.json({recommendations});

};

/**
 * POST Create the spotify playlist
 *
 * @param {*} req { refreshToken: String, groupCode: String, playlistID: String }
 * @param {*} res
 */
exports.createSpotifyPlaylist = async (req, res) => {
  // Connect to spotify API using the owners refresh access token
  spotifyApi.setRefreshToken(req.body.refreshToken);

  let formattedTrackIds = [];
  let playlistName;

  // find the group and the corresponding playlistID (playlist object ID)
  try {
    let data = await Group.find(
      { groupCode: req.body.groupCode },
      { playlists: { $elemMatch: { _id: req.body.playlistID } } }
    );

    playlistName = data[0].playlists[0].playlistName; // Set playlist Name

    // Add the spotify track ids in the necessary format for adding to playlist
    for (x of data[0].playlists[0].tracks) {
      formattedTrackIds.push("spotify:track:" + x.trackID);
    }
  } catch (err) {
    res.json(err);
  }

  let playlistID; // variable to store playlist ID (spotify based)
  try {
    let data = await spotifyApi.refreshAccessToken();
    spotifyApi.setAccessToken(data.body.access_token);

    try {
      // create spotify plyalist using the given playlist name
      // TODO adding descriptions???????
      let data = await spotifyApi.createPlaylist(playlistName, {
        description: "jams",
        public: true,
      });
      playlistID = data.body.id; // collect playlist id so we can add to it later
      console.log("playlist creation status code: ", data.statusCode);
    } catch (err) {
      res.json(err);
    }

    try {
      // Add the tracks to the spotify playlist
      let data = await spotifyApi.addTracksToPlaylist(
        playlistID,
        formattedTrackIds
      );
      console.log("playlist song addition status code: ", data.statusCode);

      res.json({
        message: "Successfully added playlist and the tracks to spotify",
        playlistID: playlistID,
        playlist: formattedTrackIds,
      });
    } catch (err) {
      res.json(err);
    }
    //TO IMPLEMENT adding an image cover to the playlist????
  } catch (err) {
    // console.log(err)
    res.json(err);
  }
};