# Overlap project repo

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
Contact repo owner for client_id, client_secret, and atlas_uri.

4. Create a `.env` file in the `frontend` directory root folder and copy the following:
```
REACT_APP_BACKEND_URL=http://localhost:8888
REACT_APP_FRONTEND_URL=http://localhost:3000
```
5. Run `npm start` in the frontend directory.
6. Run `node app.js` in the backend directory.  
<br/>

## API Endpoint Documentation:
### POST: /users/login
Use case:
After successful authentication using our landing page, make request to backend to create user object in database. The API will check if the user already exists in the database, and only add a user object entry in the case where there is no user.

Expected request JSON:
```
refreshToken: The SpotifyAPI refresh token of the user after user authentication. (string)
```

Returns:
```
spotifyID: Unique Spotify ID of the user, which will be used afterwards for most endpoint consumption for our API. (string)

-> Also returns display name, profile_pic url, etc. which will be useful for user display within groups, and also user profile display.
```

### POST: /groups/create
Use case:
Consume endpoint for group creation, and use groupCode return to redirect to group page.

Expected request JSON:
```
name: Name of the group to be created. (string)
spotifyID: ID of the user creating the group who will be tagged as the group leader. (string)
```

Returns:
```
groupCode: Unique code for the group. (string)
```

### POST: /groups/join
Use case:
Consume endpoint for group joining, and use groupCode return to redirect to group page. If group does not exist yet, API will respond with error.

Expected request JSON:
```
groupCode: Code of the group user is attempting to join. (string)
spotifyID: ID of the user joining the group. (string)
```

Returns:
```
status: 200 (Okay) or 404 (Not found) (status)
```


### GET: /groups/:groupCode/users
Use case:
Make request with a groupCode, and the API will respond with an array of user objects which belong to the group. To use, replace ":groupCode" with the group code.

Request JSON is not expected.

Return:

```
Array of user objects. ([array])
```

### GET: /users/:userID/groups
Use case:
Request with userID parameter and API will return with an array of group objects which the user belong to. To use, replace ":userID" with the user ID of the user you want to find groups from. 

Request JSON is not expected.

Return:

```
Array of group objects. ([array])
```
