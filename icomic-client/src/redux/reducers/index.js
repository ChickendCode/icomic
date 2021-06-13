import { combineReducers } from 'redux'
import categoriesReducer from './categories.reducer'
import chaptersReducer from './chapters.reducer'
import storiesReducer from './stories.reducer'
import usersReducer from './users.reducer'
import webReducer from './web.reducer'

const rootReducer = combineReducers({
  categories: categoriesReducer,
  chapters: chaptersReducer,
  stories: storiesReducer,
  users: usersReducer,
  web: webReducer
})

export default rootReducer