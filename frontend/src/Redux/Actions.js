//Set refresh token action
export const updateRefreshToken = (newRefreshToken = "") => {
  return {
    type: "refreshToken/update",
    payload: {
      refreshToken: newRefreshToken,
    },
  };
};

//Set user object action
export const updateUser = (newUser = null) => {
  return {
    type: "userObject/update",
    payload: {
      newUser: newUser,
    },
  };
};

//Update group list action
export const updateGroupList = (groupList) => {
  return {
    type: "groupList/update",
    payload: {
      groupList: groupList,
    },
  };
};

// //Update group name action
// export const updateGroupName = (groupName) => {
//   return {
//     type: "groupName/update",
//     payload: {
//       groupName: groupName,
//     },
//   };
// };

// //Update group code action
// export const updateGroupCode = (groupCode) => {
//   return {
//     type: "groupCode/update",
//     payload: {
//       groupCode: groupCode,
//     },
//   };
// };

// //Update group users action
// export const updateGroupUsers = (groupUsers) => {
//   return {
//     type: "groupUsers/update",
//     payload: {
//       groupUsers: groupUsers,
//     },
//   };
// };

// //Update group playlist action
// export const updateGroupPlaylists = (groupPlaylists) => {
//   return {
//     type: "groupPlaylists/update",
//     payload: {
//       groupPlaylists: groupPlaylists,
//     },
//   };
// };