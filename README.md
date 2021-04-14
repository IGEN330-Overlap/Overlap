# Overlap Project 
[<img src="public\images\overlap-logo.png" width="25%">](https://project-overlap.herokuapp.com)

# About the project
Overlap is a web application designed and created by six Integrated Engineering Students at UBC. One thing the COVID pandemic has showed us is the lack of socialibilty in music. Where you could previously go to parties or concerts and discover new music, the pandemic has limited the opportunities to expand your own horizons. Seeing this gap we decided to build an application that helps you connect with your friends to help build stronger relationships and keep connections that can fade in the online environment. Check out our app [here](https://project-overlap.herokuapp.com).

The application integrates Spotify to collect a user's listening habits and lets you:
 - Create and join music sharing groups with friends.
 - Compare music stats and insights with a group.
 - Generate playlists using the group's music taste and overlap.

## Tech / Framework used
The application is built using the MERN stack. Our frontend is built with [ReactJS](https://reactjs.org) and [Bootstrap](https://react-bootstrap.github.io/) in addition to [Redux](https://redux.js.org/) for global state management. Our backend is a RESTful API built with [ExpressJS](https://expressjs.com), [NodeJS](https://nodejs.org/en/), and [MongoDB](https://www.mongodb.com), and integrates the [Spotify API](https://developer.spotify.com/documentation/web-api/).

# For Contributors
## Setup:
1. I recommend having two terminal instances open: one for the frontend directory and one for the backend directory.
2. Run `npm install` for both directories.
3. Create a `.env` file in the `backend` directory root folder and copy the following:
```
BACKEND_URL=http://localhost:8888
FRONTEND_URL=http://localhost:3000
CLIENT_ID=
CLIENT_SECRET=
ATLAS_URI=
```
Contact repo owner for client_id, client_secret, and atlas_uri. Alternatively, you could also build your own Spotify Application and run the repository as well with your own client. [Here](https://developer.spotify.com/dashboard/applications) you can create your own client with Spotify.

4. Create a `.env` file in the `frontend` directory root folder and copy the following:
```
REACT_APP_BACKEND_URL=http://localhost:8888
REACT_APP_FRONTEND_URL=http://localhost:3000
```
5. Run `npm start` in the frontend directory.
6. Run `node app.js` in the backend directory.  
<br/>

# Using the Application
Check out our application [here](https://project-overlap.herokuapp.com) and specifically the "how it works" page if you want to learn more about it.

# Documentation: check the [WIKI](https://github.com/IGEN330-Overlap/Overlap/wiki)
If you want to help contribute or read into our documentation you can look at your repository wiki which has the relevant and important information to our application.
The wiki contains relevant API references and information on our database. 
A sample of what our documentation looks like is below for hthte users login endpoint.
