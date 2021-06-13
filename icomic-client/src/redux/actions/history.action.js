import * as API from '../../services/history.services'
import { toggleLoading } from './web.actions'

export const createHistory = (payload) => ({
  type: 'CREATE_ONE_HISTORY',
  payload
})

export const createHistoryAsync = (newHistory) => {
  return dispatch => {
    dispatch(toggleLoading(true))

    API.createHistory(newHistory)
      .then(res => {
        if (res.data && res.data.status) {
          dispatch(
            createHistory(res.data.newHistory)
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

export const updateHistory = (payload) => ({
  type: "UDPATE_ONE_HISTORY",
  payload
})

export const updateHistoryAsync = (_id, newHistory, index) => {
  return dispatch => {
    dispatch(toggleLoading(true))

    API.updateHistory(_id, newHistory)
      .then((res) => {
        if (res.data && res.data.status) {
          dispatch(
            updateHistory({
              History: res.data.newHistory,
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