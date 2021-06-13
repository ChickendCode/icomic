import * as API from '../../services/categories.services'
import { toggleLoading } from './web.actions'

export const getAllCategories = (payload) => ({
  type: "GET_ALL_CATEGORIES",
  payload
})

export const getAllCategoriesAsync = (query) => {
  return dispatch => {
    API.getAllCategories(query)
      .then((res) => {
        if (res.data && res.data.status) {
          dispatch(
            getAllCategories({
              categories: res.data.categories,
              categoryPage: {
                totalPage: res.data.totalPage,
                currentPage: res.data.currentPage,
                totalCategories: res.data.totalCategories,
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

export const createCategory = (payload) => ({
  type: 'CREATE_ONE_CATEGORY',
  payload
})

export const createCategoryAsync = (newCategory, callback) => {
  return dispatch => {
    dispatch(toggleLoading(true))

    API.createCategory(newCategory)
      .then(res => {
        if (res.data && res.data.status) {
          if (callback) callback()
          dispatch(
            createCategory(res.data.newCategory)
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

export const updateCategory = (payload) => ({
  type: "UPDATE_ONE_CATEGORY",
  payload
})

export const updateCategoryAsync = (_id, newCategory, index, callback) => {
  return dispatch => {
    dispatch(toggleLoading(true))

    API.updateCategory(_id, newCategory)
      .then((res) => {
        if (res.data && res.data.status) {
          if (callback) callback()
          dispatch(
            updateCategory({
              category: res.data.newCategory,
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

export const removeCategoryAsync = (_id) => {
  return (dispatch) => {
    API.removeCategory(_id)
      .then((res) => {
        if (res.data && res.data.status) {
          alert('Xóa thành công!')
          dispatch(removeCategory(_id))
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

export const removeCategory = (payload) => {
  return {
    type: "DELETE_ONE_CATEGORY",
    payload,
  }
}