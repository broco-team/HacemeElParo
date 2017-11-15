import { fromJS } from 'immutable'

//Actions
export const GET_USER = 'GET_USER'
export const SET_USER = 'SET_USER'
export const GET_MY_TODOS = 'GET_MY_TODOS'
export const TOGGLE_LOGGED = 'TOGGLE_LOGGED'
export const ERROR = 'ERROR'
export const REMOVE_MONEY = 'REMOVE_MONEY'
export const ADD_MONEY = 'ADD_MONEY'

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

export const add_money = (amount) => {
  return {
    type: ADD_MONEY,
    amount,
  }
}

export const remove_money = (amount) => {
  return {
    type: REMOVE_MONEY,
    amount,
  }
}

//Default State
const default_state = fromJS({
  isLoggedIn: true,
  isFetching: false,
  errorFetching: false,
  user: {
    id: '10155842589724500',
    name: 'Diego Sosa',
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/18199565_10155250321454500_8272315564343484143_n.jpg?oh=2df122ddd18569433e878abd3ee3035c&oe=5AAC06BC',
    money: 100,
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
      let money = state.getIn(['user', 'money'])
      let newUser = state.set('user', fromJS({id: action.user.id, name: action.user.name , picture: action.user.picture, money}))
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
    case ADD_MONEY:
      let amoney = state.setIn(['user', 'money'], state.getIn(['user', 'money']) + action.amount)
      return amoney
    case REMOVE_MONEY:
      let rmoney = state.setIn(['user', 'money'], state.getIn(['user', 'money']) - action.amount)
      return rmoney
    default:
      /*console.log('State: '+state)
      console.log('Action: '+action)*/
      return state
  }
}

export default reducer