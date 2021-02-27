//Define initial state
const initialState = {
  refreshToken: "",
  userObject: null,
  groupList: [],
  groupUsers: [],
  playlists: [],
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
      let newState = {...state, userObject: action.payload.newUser}
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;