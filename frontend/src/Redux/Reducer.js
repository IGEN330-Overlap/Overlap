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
    default:
      return state;
  }
};

export default reducer;
