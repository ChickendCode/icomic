import request from '../utils/request'

export const getAllCategories = (query) => {
  const { page, search } = query || {}
  let url = `/categories?page=${page || 1}&`

  if (search) {
    url = url + `search=${search}`
  }

  return request(url, 'GET')
}

export const createCategory = (data) => {
  return request('/categories', 'POST', data)
}

export const updateCategory = (_id, data) => {
  return request(`/categories/${_id}`, 'PUT', data)
}

export const removeCategory = (_id) => {
  return request(`/categories/${_id}`, 'DELETE')
}