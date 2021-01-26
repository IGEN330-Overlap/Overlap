//const { Mongoose } = require('mongoose');
const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret
const backend_url = process.env.BACKEND_URL;
const frontend_url = process.env.FRONTEND_URL;
const Group = require('./Models/group.model.js');
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

/* PostMan Testing instructions for createGroup:

1. Make a new post request, 
2. enter http://localhost:8888/group/create
3. Body -> Raw
3. {
    "name": "Study Buddies 2"
    "spotifyID": "    "6zzd11w6ibnra9mh12zuxcsp7"
}

*/
