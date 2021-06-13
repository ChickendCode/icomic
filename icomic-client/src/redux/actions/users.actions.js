import * as API from '../../services/users.services'
import { toggleLoading } from './web.actions'

export const getAllUsers = (payload) => ({
  type: "GET_ALL_USERS",
  payload
})


export const getUserData = (userData) => {
  return {
    type: "GET_USER_DATA",
    payload: userData,
  }
}

export const getAllUsersAsync = (query, loading) => {
  return dispatch => {
    if (loading) dispatch(toggleLoading(true))

    API.getAllUsers(query)
      .then((res) => {
        if (res.data && res.data.status) {
          dispatch(
            getAllUsers({
              users: res.data.users,
              userPage: {
                totalPage: res.data.totalPage,
                currentPage: res.data.currentPage,
                totalUsers: res.data.totalUsers,
              },
            })
          )
        } else {
          alert('ERROR! ' + res.data.message)
        }
      })
      .catch((err) => {
        alert('ERROR! ' + err)
      })
      .then(() => {
        dispatch(toggleLoading(false))
      })
  }
}

export const createUser = (payload) => ({
  type: 'CREATE_ONE_USER',
  payload
})

export const createUserAsync = (newUser) => {
  return dispatch => {
    dispatch(toggleLoading(true))

    API.createUser(newUser)
      .then(res => {
        if (res.data && res.data.status) {
          dispatch(
            createUser(res.data.newUser)
          )
        } else {
          alert('ERROR! ' + res.data.message)
        }
      })
      .catch((err) => {
          alert('ERROR! ' + err)
      })
      .then(() => {
        dispatch(toggleLoading(false))
      })
  }
}

export const updateUser = (payload) => ({
  type: "UDPATE_ONE_USER",
  payload
})

export const updateUserAsync = (_id, newUser, index) => {
  return dispatch => {
    dispatch(toggleLoading(true))

    API.updateUser(_id, newUser)
      .then((res) => {
        if (res.data && res.data.status) {
          dispatch(
            updateUser({
              Users: res.data.newUser,
              index
            })
          )
        } else {
          alert('ERROR! ' + res.data.message)
        }
      })
      .catch((err) => {
        alert('ERROR! ' + err)
      })
      .then(() => {
        dispatch(toggleLoading(false))
      })
  }
}

export const removeUserAsync = (_id) => {
  return (dispatch) => {
    API.deleteUser(_id)
      .then((res) => {
        if (res.data && res.data.status) {
          dispatch(removeUser(_id))
        } else {
          alert('ERROR! ' + res.data.message)
        }
      })
      .catch((err) => {
        alert('ERROR! ' + err)
      })
      .then(() => {
        dispatch(toggleLoading(false))
      })
  }
}

export const removeUser = (payload) => {
  return {
    type: "DELETE_ONE_USER",
    payload,
  }
}