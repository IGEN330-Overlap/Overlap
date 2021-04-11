const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

let User = require("../Models/user.model");
let Group = require("../Models/group.model");

const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret
const backend_url = process.env.BACKEND_URL;

const redirect_uri = backend_url + "callback"; // Your redirect uri

// SCRIPTS imports
const { calculateMusicalProfile } = require("../scripts.js");
const { calculateDate } = require("../scripts.js");
const { buildPlaylistMoodProfile } = require("../scripts.js");
const { generateCode } = require("../scripts.js");

const playlistCoverImages = require("../playlistCoverImages.json");

/**
 * POST generate group top playlists
 *
 * @param {*} req { refreshToken: String, userIDs: [Strings], groupCode: String}
 * @param {*} res
 */
exports.generateGroupsTopPlaylist = async (req, res) => {
  // instantiate spotifyApi object
  let spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: redirect_uri,
  });

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
      error: e,
    });
  }

  let numUsers = userIDs.length; // keep track of number of users
  let contributorsUsernames = []; // array to store usernames of playlist contributors

  // Collect user top track data into top tracks array
  try {
    let data = await User.find({ userID: { $in: userIDs } });

    // Add each persons dataset to our master array for the corresponding thing
    for (x of data) {
      usersTopTracks.push(x.topTracks);
      usersMusicalProfile.push(x.musicalProfile);
      usersTopArtists.push(x.topArtists);
      contributorsUsernames.push({
        name: x.name,
        userImageURL: x.imageURL,
      });
    }
  } catch (err) {
    console.log("error on finding users", err);
    res.json({ message: "error on finding users", error: err });
  }

  let masterSetTracks = []; //stores all top tracks as an item
  let masterSetArtists = []; //Array to store every artist from total group
  let findDuplicatesArr = []; //stores all track IDs as an item

  // put all the songs into one array, the master set and find duplicates
  for (data of usersTopTracks.flat()) {
    masterSetTracks.push({
      data,
      identifier: data.trackName + " " + data.artistName,
    });
    findDuplicatesArr.push(data.trackName + " " + data.artistName);
  }

  // put all artists into one array and collect the ids
  masterSetArtists = usersTopArtists.flat().map((x) => x.artistID);

  /* Let's algorithm: This is making a 30 song playlist */

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
    numUsers <= 7 &&
    numUsers > 2 &&
    maxCountTracks >= numUsers - Math.floor(numUsers / 2)
  ) {
    // A song must appear a minimum in 1/2 the users (half+1) if the num users in group is odd
    let numOccurencesOfSongsToAdd = numUsers - Math.floor(numUsers / 2);

    // filters for songs that appear the same amount of times as (numusers/2 +1) or more
    let mostFrequentTracks = Object.keys(counts).filter(
      (k) => counts[k] >= numOccurencesOfSongsToAdd
    );

    duplicateBasedSongs = mostFrequentTracks.slice(0, 7);

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

    duplicateBasedSongs = mostFrequentTracks.slice(0, 7);
  }

  // Using track sounds to add the rest of the songs
  let groupsMusicalProfile = calculateMusicalProfile(usersMusicalProfile);

  // Remove all duplicates and add to the new array groupUniqueSet
  let groupUniqueSet = masterSetTracks.filter(
    (v, i, a) => a.findIndex((t) => t.identifier === v.identifier) === i
  );

  // calculate differences between each attribute and a song
  // add new prop "deltaFromGroup" which acts as an all in one ranking against the groups listening habits
  for (var i = 0; i < groupUniqueSet.length; i++) {
    groupUniqueSet[i]["deltaFromGroup"] =
      Math.abs(
        groupUniqueSet[i].data.trackPopularity -
          groupsMusicalProfile.trackPopularity
      ) +
      Math.abs(
        groupUniqueSet[i].data.danceability - groupsMusicalProfile.danceability
      ) +
      Math.abs(groupUniqueSet[i].data.energy - groupsMusicalProfile.energy) +
      Math.abs(groupUniqueSet[i].data.valence - groupsMusicalProfile.valence);
  }

  // Sort the unique set by the deltaFromGroup to (lowest to highest), lowest is the best
  let sortedTrackSet = groupUniqueSet.sort((a, b) => {
    return parseFloat(a.deltaFromGroup) - parseFloat(b.deltaFromGroup);
  });

  // Parses master set and adds the generate playlist tracks and the necessary info too
  // add the commonly occuring songs and the relevant props, can definitely be optimized
  try {
    var i,
      j = 0;
    for (i = 0; j < duplicateBasedSongs.length; i++) {
      // trackIDs match then add the corresponding data
      if (i == groupUniqueSet.length) {
        break;
      } else if (duplicateBasedSongs[j] === groupUniqueSet[i].identifier) {
        playlistTracks.push({
          trackName: groupUniqueSet[i].data.trackName,
          trackID: groupUniqueSet[i].data.trackID,
          imageURL: groupUniqueSet[i].data.imageURL,
          linkURL: groupUniqueSet[i].data.linkURL,
          artistName: groupUniqueSet[i].data.artistName,
          identifier:
            groupUniqueSet[i].data.trackName +
            " " +
            groupUniqueSet[i].data.artistName,
        });
        // iterate to next track and reset the master to retraverse from left
        j++;
        i = 0;
      }
    }
  } catch (e) {
    console.log("Duplicates error");
    res.json({
      message: "duplicates adding error",
      error: e,
    });
    return;
  }

  // purely trackIDs of duplicate songs for the recommendation seed
  let mostFrequentTracks = playlistTracks.map((x) => x.trackID);

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

  let sortedTrackSeed = []; // used to get seed for non duplicates

  // must have at least a single commonality to generate a viable seed based on the duplicates
  // otherwise use the best 3 matching songs to the group profile
  sortedTrackSeed = sortedTrackSet.map((x) => x.data.trackID).slice(0, 3); //just take top 3

  try {
    let tokenData = await spotifyApi.refreshAccessToken();
    spotifyApi.setAccessToken(tokenData.body.access_token);

    // if either is 1 then automatically use the tracks for seeds
    if (maxCountArtists == 1 || maxCountTracks == 1) {
      try {
        // get spotify data based on the groups profile
        let data = await spotifyApi.getRecommendations({
          target_danceability: musicalProfile.danceability / 100,
          target_energy: musicalProfile.energy / 100,
          target_valence: musicalProfile.valence / 100,
          min_popularity: 35,
          limit: 30,
          seed_tracks: sortedTrackSeed,
        });

        // add the songs ensuring that their type is correct and that there is populated data
        for (x of data.body.tracks) {
          if (
            x.type == "track" &&
            x.album.images.length != 0 &&
            x.artists.length != 0
          ) {
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
        console.log("error in get recomendations", err);
        res.json({
          message: "error in get recoemmendations",
          error: err,
        });
        return;
      }
    } else if (maxCountArtists != 1 || maxCountTracks != 1) {
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
            min_popularity: 40,
            limit: 30,
            seed_artists: mostFrequentArtists.slice(0, 5),
          });
        } else {
          data = await spotifyApi.getRecommendations({
            target_danceability: musicalProfile.danceability / 100,
            target_energy: musicalProfile.energy / 100,
            target_valence: musicalProfile.valence / 100,
            min_popularity: 40,
            limit: 30,
            seed_tracks: mostFrequentTracks.slice(0, 5),
          });
        }

        // add the songs ensuring that their type is correct and that there is populated data
        for (x of data.body.tracks) {
          if (
            x.type == "track" &&
            x.album.images.length != 0 &&
            x.artists.length != 0
          ) {
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
        console.log("error in get recomendations", err);
        res.json({
          message: "error in get recoemmendations",
          error: err,
        });
        return;
      }
    }
  } catch (err) {
    console.log("error with the refresh token");
    res.json({
      message: "error with the refresh token",
      error: err,
    });
    return;
  }

  try {
    // Add all the recommendation songs from spotify until the playlist has 25 songs
    for (var i = 0; playlistTracks.length < 25; i++) {
      // We have added all the reccomendations so break from loop
      if (i == recommendations.length) {
        break;
        // Add an attribute songs so long as they don't already exist in duplicates
      } else if (
        !playlistTracks.some(
          (e) => e.identifier == recommendations[i].identifier
        )
      ) {
        playlistTracks.push({
          trackName: recommendations[i].trackName,
          trackID: recommendations[i].trackID,
          imageURL: recommendations[i].imageURL,
          linkURL: recommendations[i].linkURL,
          artistName: recommendations[i].artistName,
          identifier:
            recommendations[i].trackName + " " + recommendations[i].artistName,
        });
      }
    }

    // Add all the attribute based songs adding from lowest to highest until we satisfy our playlist size
    for (var i = 0; playlistTracks.length < 30; i++) {
      if (i == sortedTrackSet.length) {
        break; // if we have already added all the sorted tracks then break
      }
      // Add an attribute songs so long as they don't already exist in duplicates
      else if (
        !playlistTracks.some(
          (e) => e.identifier == sortedTrackSet[i].identifier
        )
      ) {
        playlistTracks.push({
          trackName: sortedTrackSet[i].data.trackName,
          trackID: sortedTrackSet[i].data.trackID,
          imageURL: sortedTrackSet[i].data.imageURL,
          linkURL: sortedTrackSet[i].data.linkURL,
          artistName: sortedTrackSet[i].data.artistName,
          identifier:
            sortedTrackSet[i].data.trackName +
            " " +
            sortedTrackSet[i].data.artistName,
        });
      }
    }
  } catch (err) {
    console.log("Adding recommendations or ends error");
    res.json({
      message: "Adding recommendations or ends error",
      error: err,
    });
    return;
  }
  /* End of algorithm */

  // Remove identifier property
  playlistTracks.map((item) => {
    delete item.identifier;
    return item;
  });

  // Create playlist object which will be uploaded to the group, passed to MongoDB
  playlist = {
    playlistName: req.body.playlistName,
    playlistCode: generateCode(12), //generate length 12 code for the playlist
    tracks: playlistTracks,
    contributors: contributorsUsernames,
    createDate: calculateDate(), //calculate loocal server date
    playlistType: "top",
  };

  // Update playlist to the group, Note: no error is thrown when the groupCode is incorrect / dne
  try {
    await Group.updateOne(
      { groupCode: req.body.groupCode },
      { $addToSet: { playlists: playlist } }
    );

    res.json({
      message: "added groups top playlist to the group",
      playlist: playlist,
    });
    return;
  } catch (err) {
    res.json({
      message: "Unable to add playlist to the group",
      error: err,
    });
    return;
  }
};

/**
 * POST generate mood based group playlist SEE WIKI for more docs
 * @param {*} req { refreshToken: String, userIDs: [String], selectedMood: String}
 * @param {*} res
 */
exports.generateGroupsMoodsPlaylist = async (req, res) => {
  // instantiate spotifyApi object
  let spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: redirect_uri,
  });

  let moodParams; // holds parameters to be sent to the get recommendations

  // Error handling, request must be a valid mood
  try {
    moodParams = buildPlaylistMoodProfile(req.body.selectedMood);

    if (moodParams == "type error" || moodParams == "undefined") {
      throw new Error();
    }
  } catch (e) {
    console.log("tried to generate mood playlist without selected mood");
    res.json({
      message: "no selected mood",
      error: e,
    });
    return;
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
      error: e,
    });
    return;
  }

  let usersTopTracks = []; // arrays for storing user track information
  let contributorsUsernames = []; // array to store usernames of playlist contributors

  // Collect user top "x" data from mongoDB
  try {
    let data = await User.find({ userID: { $in: userIDs } });

    // Add each persons dataset to our master array for the corresponding thing
    for (x of data) {
      usersTopTracks.push(x.topTracks);
      contributorsUsernames.push({
        name: x.name,
        userImageURL: x.imageURL,
      });
    }
  } catch (err) {
    res.json({
      message: "error on finding users",
      error: err,
    });
  }
  // set tracks into one array and removes duplicates
  let masterTopTracks = usersTopTracks.flat();
  masterTopTracks = masterTopTracks.filter(
    (v, i, a) =>
      a.findIndex(
        (t) => t.trackName + t.artistName === v.trackName + v.artistName
      ) === i
  );

  // calculate differences between each attribute and a song
  // add new prop "deltaFromGroup" which acts as an all in one ranking against the groups listening habits
  for (var i = 0; i < masterTopTracks.length; i++) {
    masterTopTracks[i]["delta"] =
      Math.abs(
        masterTopTracks[i].danceability - moodParams.target_danceability
      ) +
      Math.abs(masterTopTracks[i].energy - moodParams.target_energy) +
      Math.abs(masterTopTracks[i].valence - moodParams.target_valence);
  }

  // Sort the unique set by the deltaFromGroup to (lowest to highest), Lowest is the best
  let sortedTrackSet = masterTopTracks.sort((a, b) => {
    return parseFloat(a.delta) - parseFloat(b.delta);
  });

  let seedTracks = [];
  let playlistTracks = [];

  // Add seed tracks to the playlist so long as they meet the required delta
  for (x of sortedTrackSet) {
    // add to playlist if the song is precisely enough matching the target profile
    if (x.delta <= 0.15) {
      playlistTracks.push({
        trackName: x.trackName,
        trackID: x.trackID,
        imageURL: x.imageURL,
        linkURL: x.linkURL,
        artistName: x.artistName,
      });
      // add to seed tracks so long as we don't already have 5
      if (seedTracks.length < 5) {
        seedTracks.push(x.trackID);
      } else {
        break; // already have 5 tracks meeting criteria
      }
    } else {
      break; // break from loop if the delta doesn't meet requirements
    }
  }

  // if no song currently made it use the closest 3 as seed tracks in case
  if (seedTracks.length == 0) {
    seedTracks = sortedTrackSet.map((x) => x.trackID).slice(0, 5);
  } else if (seedTracks.length <= 2) {
    // concatenate more songs if seedtracks are 2 or less
    seedTracks = seedTracks.concat(
      sortedTrackSet.map((x) => x.trackID).slice(0, 3)
    );
  }

  spotifyApi.setRefreshToken(req.body.refreshToken); // set refresh token
  try {
    let tokenData = await spotifyApi.refreshAccessToken();
    spotifyApi.setAccessToken(tokenData.body.access_token);

    try {
      // Get recommendations for the group
      let recommendationsBody = moodParams;

      recommendationsBody["seed_tracks"] = seedTracks.slice(0, 5); // force to 5 to prevent any possible error
      let data = await spotifyApi.getRecommendations(recommendationsBody);
      // add the songs ensuring that their type is correct and that there is populated data
      for (x of data.body.tracks) {
        // continuosly add songs until we've hit our playlist length (30 songs)
        if (playlistTracks.length == 30) {
          break;
          // skip past if the song has already been added to the playlist to avoid duplicates
        } else if (playlistTracks.some((x) => x.trackID == x.id)) {
          continue;
        } else if (
          x.type == "track" &&
          x.album.images.length != 0 &&
          x.artists.length != 0 &&
          x.external_urls.spotify != null
        ) {
          playlistTracks.push({
            trackName: x.name,
            trackID: x.id,
            imageURL: x.album.images[0].url,
            linkURL: x.external_urls.spotify,
            artistName: x.artists[0].name,
          });
        }
      }
    } catch (err) {
      console.log("error in get recommendations mood playlist");
      res.status(400).json({
        message: "error in get recommendations mood playlist",
        error: err,
      });
      return;
    }
  } catch (err) {
    console.log("error with spotify access token");
    res.status(400).json({
      message: "error with spotify access token",
      error: err,
    });
    return;
  }

  // Create playlist object which will be uploaded to the group, passed to MongoDB
  playlist = {
    playlistName: req.body.playlistName,
    playlistCode: generateCode(12), //generate length 9 code for the playlist
    tracks: playlistTracks,
    contributors: contributorsUsernames,
    createDate: calculateDate(),
    playlistType: req.body.selectedMood,
  };
  // Update playlist to the group
  // Note: no error is thrown when the groupCode is incorrect / dne
  try {
    if (playlistTracks.length < 20 || playlist == undefined) {
      console.log("Uncaught error in the playlist generation");
      console.log("playlist tracks len", playlistTracks.length);
      throw new Error();
    }
    await Group.updateOne(
      { groupCode: req.body.groupCode },
      { $addToSet: { playlists: playlist } }
    );
    res.json({
      message: "added " + req.body.selectedMood + " playlist to the group",
      playlist: playlist,
    });
    return;
  } catch (err) {
    console.log("Unable to add mood playlist to the group", err);
    res.status(400).json({
      message: "Unable to add mood playlist to the group",
      error: err,
    });
  }
};

/**
 * POST Create the spotify playlist
 *
 * @param {*} req { refreshToken: String, groupCode: String, playlistID: String }
 * @param {*} res
 */
exports.createSpotifyPlaylist = async (req, res) => {
  // instantiate spotifyApi object
  let spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: redirect_uri,
  });

  // Connect to spotify API using the owners refresh access token
  spotifyApi.setRefreshToken(req.body.refreshToken);

  let formattedTrackIds = [];
  let playlistName = ""; // string for playlist name
  let playlistType = ""; // string for playlistType to determine image used

  // find the group and the corresponding playlistID (playlist object ID)
  try {
    let data = await Group.find(
      { groupCode: req.body.groupCode },
      { playlists: { $elemMatch: { _id: req.body.playlistID } } }
    );

    playlistName = data[0].playlists[0].playlistName;
    playlistType = data[0].playlists[0].playlistType;

    // Add the spotify track ids in the necessary format for adding to playlist
    for (x of data[0].playlists[0].tracks) {
      formattedTrackIds.push("spotify:track:" + x.trackID);
    }
  } catch (err) {
    console.log("error on getting playlist");
    res.json({
      message: "error on getting playlist",
      error: err,
    });
  }

  //image data that will be used as the cover for the playlist
  let base64URI = playlistCoverImages["top"];
  // select base64URI based on the playlist type (otherwise keep "top" image)
  switch (playlistType) {
    case "top":
      base64URI = playlistCoverImages["top"];
      break;
    case "happy":
      base64URI = playlistCoverImages["happy"];
      break;
    case "party":
      base64URI = playlistCoverImages["party"];
      break;
    case "chill":
      base64URI = playlistCoverImages["chill"];
      break;
    case "sad":
      base64URI = playlistCoverImages["sad"];
      break;
  }

  let playlistID; // variable to store playlist ID (spotify based)
  try {
    let data = await spotifyApi.refreshAccessToken();
    spotifyApi.setAccessToken(data.body.access_token);

    try {
      // create spotify plyalist using the given playlist name
      let data = await spotifyApi.createPlaylist(playlistName, {
        description:
          "Playlist generated through Overlap. To learn more see: https://project-overlap.herokuapp.com",
        public: true,
      });
      // if not successful status code throw an error
      if (data.statusCode != 201) {
        throw new Error();
      }
      playlistID = data.body.id; // collect playlist id so we can add to it later
    } catch (err) {
      console.log("error on playlist creation");
      res.json({
        message: "error on playlist creation",
        error: err,
      });
      return;
    }

    // Add image cover to the spotify playlist
    try {
      let data = await spotifyApi.uploadCustomPlaylistCoverImage(
        playlistID,
        base64URI
      );
      // if not successful status code throw an error
      if (data.statusCode !== 202) {
        throw new Error();
      }
    } catch (err) {
      console.log("error with upload image");
      res.json({
        message: "error with upload image",
        error: err,
      });
      return;
    }

    try {
      // Add the tracks to the spotify playlist
      let data = await spotifyApi.addTracksToPlaylist(
        playlistID,
        formattedTrackIds
      );
      // if not successful status code throw an error
      if (data.statusCode != 201) {
        throw new Error();
      }

      res.json({
        message: "Successfully added playlist and the tracks to spotify",
        playlistID: playlistID,
        playlistLinkURL: "https://open.spotify.com/playlist/" + playlistID,
      });
    } catch (err) {
      console.log("error in adding tracks to playlist");
      console.log(formattedTrackIds, err);
      res.status(400).json({
        message: "error in adding tracks to playlist",
        error: err,
      });
      return;
    }
  } catch (err) {
    console.log("token error in save to spotify", err);
    res.json(err);
  }
};
