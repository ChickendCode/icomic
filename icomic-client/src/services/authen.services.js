import request from '../utils/request'

export const auth = () => {
  return request('/auth', 'GET')
}

export const loginAuth = (userData) => {
  return request('/login', 'POST', userData)
}

export const register = (userData) => {
  return request('/accounts/register', 'POST', userData)
}





