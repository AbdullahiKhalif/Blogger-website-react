export const initialState = JSON.parse(localStorage.getItem("bloger_ldb")) || {
  auth: {
    isAuthenticated: false,
    currentUser: null,
  },
  users: [],
  posts: [],
  comments: []
};

export const mainReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_NEW_USER": {
      return {
        ...state,
        users: [...state.users, payload.users],
      };
    }
    case "ADD_NEW_POST":{
      return {
        ...state,
        posts: [payload.posts, ...state.posts]
      };
    }
    case "LOGIN_USER": {
      const user = state.users.find((user) => user.email === payload.email && user.password === payload.password);
      if (user) {
        return {
          ...state,
          auth: {
            isAuthenticated: true,
            currentUser: user,
          },
        };
      }else{
        return{
            ...state,
            auth: {
                isAuthenticated: false,
                currentUser: null,
                authError: true
            }
        }
      }
    }
    case "LOGOUT": {
        return{
            ...state,
            auth:{
                isAuthenticated: false,
                currentUser: null
            }
        }
    }
    

    default:
      throw new Error("Invalid action type ");
  }
};
