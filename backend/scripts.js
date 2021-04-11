//function to generate random group code for /group/create post request
function generateCode(complexity){

    //set password length/complexity to 7 unless specified as larger
    //for groups we set complexity to 7 and for playlists we choose 9
    complexity = (complexity > 7) ? complexity : 7;

    //possible password values
    let values = "ABCDEFGHIJKLMNOPQRSTUVWZYZ1234567890";
    let password = "";

    //create for loop to choose password characters
    for(var i = 0; i <= complexity; i++){
        password = password + values.charAt(Math.floor(Math.random() * Math.floor(values.length - 1)));
    }
    
    //returns generated group code
    return password
}

/**
 * Method used to calculate the averages of people's top artists
 * @param {[track objects]} data, pass array of track objects to calcualte the averages 
 * @returns 
 */
function calculateMusicalProfile (data) {
    let pop = (dnce = nrgy = spch = acst = inst = vale = 0);

    for (x of data){
        pop += x.trackPopularity;
        dnce += x.danceability;
        nrgy += x.energy;
        spch += x.speechiness;
        acst += x.acousticness;
        inst += x.instrumentalness;
        vale += x.valence;
    }

    dataLen = data.length;

    musicalProfile = {
        trackPopularity: pop / dataLen,
        danceability: (dnce / dataLen),
        energy: (nrgy / dataLen),
        speechiness: (spch / dataLen),
        acousticness: (acst / dataLen),
        instrumentalness: (inst / dataLen),
        valence: (vale / dataLen),
      };

    return musicalProfile;
}

/**
 * Used to extract the information we want from spotify in the GET getMyTopTracks
 * parameter passed should be data.body.items
 * @param {Array} data From Spotify getTopTracks data.body.items
 * @returns 
 */
function extractUsersTopTracks (data) {
    // returns empty string if improper data sent
    if (typeof data === "undefined" || data == undefined){
        return ""; // return empty string if data is undefined 
    }

    let topTracks = [];
    let topTrackIDs = [];

    for (x of data) {
        let track = {};

        // if name is empty it usually means that the track has been removed from spotify (ex. Kpop songs on 2021-03-01)
        if (x.name.length === 0) {
            continue;
        }
        track.trackName = x.name;
        track.trackID = x.id;
        track.trackPopularity = x.popularity;
        track.linkURL = x.external_urls.spotify;

        //If album images array isn't empty, set the imageURL to the first element
        //Else set to empty string
        if (x.album.images.length != 0) {
            track.imageURL = x.album.images[0].url;
        } else {
            track.imageURL = "";
        }

        //If artists array isn't empty, set the artistName to the first element
        //Else set to empty string
        if (x.artists.length != 0) {
            track.artistName = x.artists[0].name;
        } else {
            track.artistName = "";
        }

        console.log("Scripts.js line 100:");
        console.log(track);

        topTrackIDs.push(x.id);
        topTracks.push(track);
    }
    return [topTracks, topTrackIDs];
}

/**
 * Used to extract data for our use. used in conjuction with GET getMyTopArtists
 * Should pass data.body.items from the above SpotifyAPI request
 * @param {array} data 
 * @returns [ array of artist objects, array of array of top genres for every artists] 
 */
function extractUsersTopArtistsAndGenres (data) {
    
    if (typeof data === "undefined") {
        return "";
    }

    let topArtists = [];
    let topGenres = [];
    // iterate over data and add relevant artist attributes
    for (x of data) {

        //if artist name is empty, continue
        if (x.name.length === 0 || x.name.length == null || x.images.length == 0) {
            continue;
        } else {
            topArtists.push({
                artistName: x.name,
                artistID: x.id,
                followerCount: x.followers.total,
                artistPopularity: x.popularity,
                imageURL: x.images[0].url,
                linkURL: x.external_urls.spotify,
            });
    
            if (x.genres.length != 0 && x.genres[0] != "undefined") {
                // Add genres if there are any to add and is valid
                topGenres.push(x.genres);
            } 
        }        
    }

    return [topArtists, topGenres];
}


/**
 * Gets the current date and returns the [day, month, year]
 * @returns [day, month, year]
 */
function calculateDate() {
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",        
    ];
    let d = new Date();
    let day = d.getDate().toString();
    let month = months[d.getMonth()];
    let year = d.getFullYear().toString();

    return {
        day: day,
        month: month,
        year: year,
    };
}

/**
 * Returns the corresponding mood profile, 
 * Expected parameters passed are, "happy", "sad", "chill", "party"
 * @param {String} selection, mood selection
 * @returns 
 */
function buildPlaylistMoodProfile (selection) {
    if (selection === "happy") {
        return {
            "min_energy": 0.50,
            "target_energy": 0.70,
            "min_danceability": 0.20,
            "target_danceability": 0.40,
            "max_danceability": 0.75,
            "min_valence": 0.60,
            "target_valence": 0.85,
            "min_popularity": 50,
            "limit": 30,
            "Seed_genres": [
                "happy",
                "pop",
                "summer",
            ],
        };
    } else if (selection === "chill") {
        return {
            "target_energy": 0.40,
            "max_energy": 0.70,
            "target_valence": 0.50,
            "target_danceability": 0.25,
            "max_danceability": 0.60, 
            "min_popularity": 50,
            "limit": 30,
            "Seed_genres": [
                "chill",
                "summer",
            ],
        };        

    } else if (selection === "sad") {
        return {
            "target_energy": 0.20,
            "max_energy": 0.50,
            "target_danceability": 0.10,
            "max_danceability": 0.5,
            "target_valence": 0.15,
            "max_valence": 0.50,
            "target_acousticness": 0.70,
            "min_popularity": 25,
            "max_tempo": 160,
            "limit": 30,
            "Seed_genres": [
                "sad",
                "rainy-day",
            ],
        };
    } else if (selection === "party") {
        return {
            "min_energy": 0.70,
            "target_energy": 0.80,
            "min_danceability": 0.70,
            "target_danceability": 0.85,
            "min_valence": 0.60,
            "target_valence": 0.75,
            "min_popularity": 50,
            "target_popularity": 75,
            "min_tempo": 120,
            "target_tempo": 155,
            "limit": 30,
            "Seed_genres": [
                "party",
                "pop",
                "dance",
            ],
        }; 
    } else {
        return "undefined";
    }
}

//export generateGroupCode() as a module for use in Controller.js
module.exports.generateCode = generateCode;

//export music profile calculation method
module.exports.calculateMusicalProfile = calculateMusicalProfile;

// export getTopTracks data extraction method
module.exports.extractUsersTopTracks = extractUsersTopTracks;

// export getTopTracks data extraction method
module.exports.extractUsersTopArtistsAndGenres = extractUsersTopArtistsAndGenres;

// export get date method
module.exports.calculateDate = calculateDate;

// export mood profile
module.exports.buildPlaylistMoodProfile = buildPlaylistMoodProfile;