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
