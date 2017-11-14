import { fromJS } from 'immutable'

//Actions
export const GET_USER = 'GET_USER'
export const SET_USER = 'SET_USER'
export const GET_MY_TODOS = 'GET_MY_TODOS'
export const TOGGLE_LOGGED = 'TOGGLE_LOGGED'
export const ERROR = 'ERROR'

//Action Creator

export const get_user = (token, navigation) => {
  return {
    type: GET_USER,
    token,
    navigation,
  }
}

export const set_user = (user) => {
  return {
    type: SET_USER,
    user
  }
}

export const get_my_todos = (user) => {
  return {
    type: GET_MY_TODOS,
    user
  }
}

export const toggle_logged = () => {
  return {
    type: TOGGLE_LOGGED,
  }
}

//Default State
const default_state = fromJS({
  isLoggedIn: false,
  isFetching: false,
  errorFetching: false,
  user: {
    id: '',
    name: '',
    picture: '',
    money: 0,
  }
})

const reducer = (state=default_state, action={}) => {
  switch(action.type){
    case GET_USER:
      /*console.log('State: '+state)
      console.log('Action: '+action)*/
      let fetch = state.set('isFetching', true)
      return fetch
    case SET_USER:
      /*console.log('State: '+state)
      console.log('Action: '+action)*/
      let newUser = state.set('user', fromJS({id: action.user.id, name: action.user.name}))
      let nofetchUser = newUser.set('isFetching', false)
      return nofetchUser
    case TOGGLE_LOGGED:
      /*console.log('State: '+state)
      console.log('Action: '+action)*/
      let toggled = state.set('isLoggedIn', !state.get('isLoggedIn'))
      let nofetchToggled = toggled.set('isFetching', false)
      return nofetchToggled
    case ERROR:
      /*console.log('State: '+state)
      console.log('Action: '+action)*/
      let error = state.set('errorFetching', true)
      return error
    default:
      /*console.log('State: '+state)
      console.log('Action: '+action)*/
      return state
  }
}

export default reducer