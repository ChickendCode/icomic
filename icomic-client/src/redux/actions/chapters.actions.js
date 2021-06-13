import * as API from '../../services/chapters.services'
import { getAllStoriesAsync } from './stories.action'
import { toggleLoading } from './web.actions'

export const getAllChapters = (payload) => ({
  type: "GET_ALL_CHAPTERS",
  payload
})

export const getAllChaptersAsync = (query, loading) => {
  return dispatch => {
    if (loading) dispatch(toggleLoading(true))

    API.getAllChapters(query)
      .then((res) => {
        if (res.data && res.data.status) {
          dispatch(
            getAllChapters({
              chapters: res.data.chapters,
              chapterPage: {
                totalPage: res.data.totalPage,
                currentPage: res.data.currentPage,
                totalChapters: res.data.totalChapters,
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

export const createChapter = (payload) => ({
  type: 'CREATE_ONE_CHAPTER',
  payload
})

export const createChapterAsync = (newChapter, callback) => {
  return dispatch => {
    dispatch(toggleLoading(true))
    
    API.createChapter(newChapter)
      .then(res => {
        if (res.data && res.data.status) {
          if (callback) callback()
          dispatch(getAllStoriesAsync({}, true))
          dispatch(
            createChapter(res.data.newChapter)
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

export const updateChapter = (payload) => ({
  type: "UDPATE_ONE_CHAPTER",
  payload
})

export const updateChapterAsync = (_id, newChapter, index) => {
  return dispatch => {
    dispatch(toggleLoading(true))

    API.updateChapter(_id, newChapter)
      .then((res) => {
        if (res.data && res.data.status) {
          dispatch(
            updateChapter({
              chapters: res.data.newChapter,
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

export const removeChapterAsync = (_id) => {
  return (dispatch) => {
    API.deleteChapter(_id)
      .then((res) => {
        if (res.data && res.data.status) {
          dispatch(removeChapter(_id))
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

export const removeChapter = (payload) => {
  return {
    type: "DELETE_ONE_CHAPTER",
    payload,
  }
}