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

//Members of group display
export const updateGroupUsers = (groupUsers) => {
  return {
    type: "groupUsers/update",
    payload: {
      groupUsers: groupUsers,
    },
  };
};