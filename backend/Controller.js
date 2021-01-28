const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

let User = require('./Models/user.model');
let Group = require('./Models/group.model');

const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret
const backend_url = process.env.BACKEND_URL;
const frontend_url = process.env.FRONTEND_URL;
const groupCodeGenerator = require('./scripts.js');

const redirect_uri = backend_url + 'callback'; // Your redirect uri

// instantiate spotifyApi object
var spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: redirect_uri,
});

//get current user middleware
exports.getUser = async (req, res) => {
    spotifyApi.setAccessToken(req.params.token);

    spotifyApi.getMe().then(
        (data) => {
            res.json(data);
        },
        (err) => {
            res.status(400).json(err);
        })
}


//create a new group middleware
//parameters: (name, spotifyID) where name is the group name and spotifyID 
//            is the spotifyID of the group leader
exports.createGroup = async (req,res) => {
    generatedGroupCode = groupCodeGenerator.generate
    
    //create a new instance of the group model named newGroup
    const newGroup = new Group({

        //format for storing data for the group model
        groupCode: generatedGroupCode,
        groupName: req.body.name,
        groupLeader: req.body.spotifyID,
        users: req.body.spotifyID

    });
    
    newGroup
        .save()   //.save() is a mongoose method for storing newGroup in database  
        .then(result => {
            console.log(result);   //log to console the result of .save()
    
        })
        //catching errors and log to console
        .catch(err => console.log(err));

    //response status to creating a new group
    res.status(201).json({
        message: "Handling POST request to /groups",
        createdGroup: newGroup
    });

};


//middleware for user login
//handles both new and returning user login
exports.loginUser = async (req, res) => {
    //new user object to be populated with spotify api response data
    let newUser = {}

    //set refresh token
    spotifyApi.setRefreshToken(req.body.refreshToken);

    //set new access token
    spotifyApi.refreshAccessToken().then(
        (data) => {
            spotifyApi.setAccessToken(data.body.access_token);

            //get user object from SpotifyAPI
            spotifyApi.getMe().then(
                (data) => {
                    //populate newUser object
                    newUser.userID = data.body.id;
                    newUser.refreshToken = req.body.refreshToken;
                    newUser.name = data.body.display_name;
                    newUser.imageURL = data.body.images[0].url;
                    newUser.email = data.body.email;

                    //delete previous mongodb entry
                    //define query to find user with ID that matches ID for current request
                    User.findOneAndDelete({ "userID": data.body.id }, { "sort": { "userID": 1 } })
                        .then(() => {
                            console.log("ID of login attempt: " + data.body.id);

                            //create new User in MongoDB
                            User.create(newUser).then(
                                data => {
                                    res.json(data);
                                },
                                err => {
                                    res.json(err);
                                }
                            );
                        },
                            //error in user delete
                            err => {
                                res.json(err);
                            }
                        );
                },
                //SpotifyAPI return error
                (err) => {
                    res.status(400).json(err);
                })
        },
        //access token refresh error
        (err) => {
            res.json("Unable to refresh access token.");
            console.log(err);
        }
    );
}
