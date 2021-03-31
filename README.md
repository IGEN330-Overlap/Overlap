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
To use the application you need to complete the steps above. Once you have completed steps 5 and 6 open your browser and open http://localhost:3000 which should lead you to the login page. After clicking login you are redirected to the spotify login and authorization process looking like this:
![image](https://user-images.githubusercontent.com/51245035/109400671-f796dc80-7917-11eb-9f46-1189a9baf4ea.png)
This then brings you to our Overlap Home page. Here you can navigate between groups, create groups, or join groups with codes given to you by your friends. When creating a group it requires you to set a name. Once the group is created you can distribute the group code to your friends so that they are able to join. While unfinished this is currently what the page looks like.
![image](https://user-images.githubusercontent.com/51245035/109400726-417fc280-7918-11eb-8dd2-f30f3f4f4382.png)
Entering a group page you are greeted with the members of the group, our rapid comparison tool, and a log of the playlists that have been previously created.
![image](https://user-images.githubusercontent.com/51245035/109400777-a0ddd280-7918-11eb-90e4-d43afe4a03ce.png)
Finally there is our playlist page which displays a top playlist for the group at a certain point in time.
![image](https://user-images.githubusercontent.com/51245035/109400793-b94ded00-7918-11eb-9e19-56790b6617d2.png)

# Documentation: MOVED TO THE [WIKI](https://github.com/IGEN330-Overlap/Overlap/wiki)
If you want to help contribute or read into our documentation you can look at your repository wiki which has the relevant and important information to our application.
The wiki contains relevant API references and information on our database. 
A sample of what our documentation looks like is below for hthte users login endpoint.
