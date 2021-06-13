const initState = {
  auth: {},
  user: {},
  users: [],
  userPage: {},
  login: false,
}

const usersReducer = (state = initState, action) => {
  const { type, payload } = action

  switch (type) {
    case "GET_ALL_USERS": {
      return {
        ...state,
        users: payload.users,
        userPage: payload.userPage
      }
    }

    case "CREATE_ONE_USER": {
      const { users } = state

      return {
        ...state,
        users: [
          ...users,
          payload
        ]
      }
    }

    case "UPDATE_ONE_USER": {
      const { users } = state
      const { newUser, index } = payload
      let newUsers = [
        ...users.slice(0, index),
        newUser,
        ...users.slice(index + 1)
      ]

      return {
        ...state,
        users: newUsers
      }
    }

    case "DELETE_ONE_USER": {
      const { users } = state
      let newUsers = users.filter(x => x._id !== payload)

      return {
        ...state,
        users: newUsers
      }
    }

    case "GET_USER_DATA": {
      const {
        login,
        fullName,
        address,
        _id,
        image,
        role,
        token,
        email,
        username,
        phone,
      } = payload
      localStorage.setItem("accessToken", token)
      localStorage.setItem("role", role)
      localStorage.setItem("login", login)

      return {
        ...state,
        login: login,
        user: {
          _id,
          username,
          fullName,
          role,
          userImage: image,
          phone,
          email,
          address,
        },
      }
    }

    case "AUTHENTICATION": {
      const { login, user } = payload
      const {
        fullName,
        address,
        _id,
        image,
        role,
        email,
        username,
        phone,
      } = user
      return {
        ...state,
        login: login,
        user: {
          _id,
          username,
          fullName,
          role,
          userImage: image,
          phone,
          email,
          address,
        },
      }
    }

    case "CLEAR_DATA": {
      return {
        ...state,
        login: false,
        user: {
          _id: "",
          username: "",
          fullName: "",
          role: "",
          userImage: null,
          phone: "",
          email: "",
          address: "",
        },
      }
    }
    
  }

  return state
}

export default usersReducer