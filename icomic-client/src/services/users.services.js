import request from '../utils/request'

export const createUser = (data) => {
    return request('/accounts', 'POST', data)
}

export const updateUser = (_id, data) => {
    return request(`/accounts/${_id}`, 'PUT', data)
}

export const getUser = (_id) => {
    return request(`/accounts/${_id}`, 'GET')
}

export const getAllUsers = (query) => {
    const { page, search } = query
    let url = `/accounts?page=${page || 1}`
    if (search && search !== '') url = url + `&search=${search}`

    return request(url, 'GET')
}

export const deleteUser = (_id, image) => {
    return request(`/accounts/${_id}`, 'DELETE', image)
}