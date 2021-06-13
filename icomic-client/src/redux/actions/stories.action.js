import * as API from '../../services/stories.services'
import { toggleLoading } from './web.actions'

export const getAllStories = (payload) => ({
  type: "GET_ALL_STORIES",
  payload
})

export const getAllStoriesAsync = (query, loading) => {
  return dispatch => {
    if (loading) dispatch(toggleLoading(true))

    API.getAllStories(query)
      .then((res) => {
        if (res.data && res.data.status) {
          dispatch(toggleLoading(false))
          dispatch(
            getAllStories({
              stories: res.data.stories,
              totalStories: res.data.totalStories,
              storyPage: {
                totalPage: res.data.totalPage,
                currentPage: res.data.currentPage,
                totalStories: res.data.totalStories,
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

export const createStory = (payload) => ({
  type: 'CREATE_ONE_STORY',
  payload
})

export const createStoryAsync = (newStory, callback) => {
  return dispatch => {
    dispatch(toggleLoading(true))

    API.createStory(newStory)
      .then(res => {
        if (res.data && res.data.status) {
          if (callback) {
            callback()
          }
          dispatch(
            getAllStoriesAsync({}, true)
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

export const updateStory = ({ newStory, index }) => ({
  type: "UPDATE_ONE_STORY",
  payload: { newStory, index }
})

export const updateStoryAsync = (_id, newStory, index, callback, loading) => {
  return dispatch => {
    if (!loading)
      dispatch(toggleLoading(true))
    API.updateStory(_id, newStory, index)
      .then((res) => {
        if (res.data && res.data.status) {
          if (callback) {
            callback()
          }
          dispatch(
            getAllStoriesAsync({}, true)
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

export const removeStoryAsync = (_id) => {
  return (dispatch) => {
    API.deleteStory(_id)
      .then((res) => {
        if (res.data && res.data.status) {
          alert('Xóa thành công!')
          dispatch(removeStory(_id))
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

export const removeStory = (payload) => {
  return {
    type: "DELETE_ONE_STORY",
    payload,
  }
}
