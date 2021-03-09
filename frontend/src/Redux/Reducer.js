//Define initial state
const initialState = {
  refreshToken: "",
  userObject: {
    email: "",
    imageURL: "",
    musicalProfile: {
      acousticness: 0,
      danceability: 0,
      energy: 0,
      instrumentalness: 0,
      speechiness: 0,
      trackPopularity: 0,
      valence: 0,
    },
    name: "",
    refreshToken: "",
    topArtists: [],
    topTracks: [],
    userID: "",
  },
  groupList: [],
  currentGroup: {
    groupCode: "",
    groupName: "",
    groupUsers: [],
    groupPlaylists: [],
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //for updating refresh token
    case "refreshToken/update": {
      let newState = state;
      newState.refreshToken = action.payload.refreshToken;
      return newState;
    }
    //for updating user self object
    case "userObject/update": {
      let newState = { ...state, userObject: action.payload.newUser };
      return newState;
    }
    //for updating user group list
    case "groupList/update": {
      let newState = state;
      newState.groupList = action.payload.groupList;
      return newState;
    }
    //for updating group name
    case "groupName/update": {
      let newState = state;
      newState.currentGroup.groupName = action.payload.groupName;
      return newState;
    }
    //for updating group code
    case "groupCode/update": {
      let newState = state;
      newState.currentGroup.groupCode = action.payload.groupCode;
      return newState;
    }
    //for updating group user list
    case "groupUsers/update": {
      let newState = state;
      newState.currentGroup.groupUsers = action.payload.groupUsers;
      return newState;
    }
    case "groupPlaylists/update": {
      let newState = state;
      newState.currentGroup.groupPlaylists = action.payload.groupPlaylists;
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
