import { combineReducers } from 'redux-immutable'
import todosReducer from './todos'
import userReducer from './user'

const reducer = combineReducers({
  userReducer,
  todosReducer
})

export default reducer