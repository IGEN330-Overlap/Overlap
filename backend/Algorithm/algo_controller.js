// Don't bother using the song and artist class
const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret
const redirect_uri = process.env.BACKEND_URL + "callback"; // Your redirect uri
// instantiate spotifyApi object
var spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uri,
});

exports.getMyTopTracks = async (req, res) => {
  //set refresh token
  spotifyApi.setRefreshToken(req.body.refreshToken);

  //set new access token
  spotifyApi.refreshAccessToken().then(
    async (data) => {
      spotifyApi.setAccessToken(data.body.access_token);

      let topTracks = [];
      let topTrackIDs = [];
      //get user's top 3 tracks
      await spotifyApi
        .getMyTopTracks({limit: 50, time_range: req.time_range})
        .then((data) => {
          for (x of data.body.items) {
            let track = {}; // track data needed for song
            track.trackName = x.name;
            track.trackID = x.id;
            track.popularity = x.popularity;
            track.artistName = x.artists[0].name;

            topTrackIDs.push(x.id);
            topTracks.push(track);
          }
        })
        .catch((err) => {
          res.json({ message: "Unable to get user top tracks.", error: err });
          return;
        });  

      //get the corresponding top track features
      await spotifyApi
        .getAudioFeaturesForTracks(topTrackIDs)
        .then((data) => {
          var i = 0;
          // iterate over return data to extract the corresponding individual track features
          for (x of data.body.audio_features) {
            
            // Verify that we are adding to the corresponding song
            // Add the song attributes as well
            if (topTracks[i]['trackID'] == x.id) {
              topTracks[i]['danceability'] = x.danceability;
              topTracks[i]['energy'] = x.energy;
              topTracks[i]['key'] = x.key;
              topTracks[i]['loudness'] = x.loudness;
              topTracks[i]['mode'] = x.mode;
              topTracks[i]['speechiness'] = x.speechiness;
              topTracks[i]['acousticness'] = x.acousticness;
              topTracks[i]['instrumentalness'] = x.instrumentalness;
              topTracks[i]['liveness'] = x.liveness;
              topTracks[i]['valence'] = x.valence;
              topTracks[i]['tempo'] = x.tempo;
              topTracks[i]['duration_ms'] = x.duration_ms;
            }

            i++; // iterate for the next item
          }
        })
        .catch((err) => {
          res.json({ message: "Unable to get user top artists.", error: err });
          return;
        });

        res.json(topTracks); // Respond with the top track features and the songs
    },
    //access token refresh error
    (err) => {
      res.json({ message: "Unable to refresh access token.", error: err });
    }
  );
};
