import request from '../utils/request'

export const createHistory = (data) => {
    return request('/history', 'POST', data)
}

export const updateHistory = (_id, data) => {
    return request(`/history/${_id}`, 'PUT', data)
}

export const getOneHistory = (_id) => {
    return request(`/history/${_id}`, 'GET')
}