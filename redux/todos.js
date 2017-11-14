import { fromJS } from 'immutable'

//Actions
export const ADD_TODO = 'ADD_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const EDIT_TODO = 'EDIT_TODO'

//Action Creator
export const add_todo = (id, todo) => {
  return {
    type: ADD_TODO,
    todo,
    id
  }
}

export const edit_todo = (id, edited_todo) => {
  return {
    type: EDIT_TODO,
    edited_todo,
    id
  }
}

export const delete_do = (id) => {
  return {
    type: DELETE_TODO,
    id
  }
}

//Default State
const default_state = fromJS({
  todos: [],
  visibilityFilter: '',
})

const reducer = (state=default_state, action={}) => {
  switch(action.type){

    case ADD_TODO:
      /*console.log('State: '+state)
      console.log('Action: '+action)*/
      const added_todos = state.get('todos').push(fromJS({id: action.id, todo: action.todo}))
      return state.set('todos', added_todos)

   case EDIT_TODO:
      /*console.log('State: '+state)
      console.log('Action: '+action)*/
      const index = state.get('todos').findIndex(todo => todo.get('id') === action.id)
      return state.setIn(['todos', index, 'todo'], action.todo)

    case DELETE_TODO:
      /*console.log('State: '+state)
      console.log('Action: '+action)*/
      const not_deleted_todos = state.get('todos').filter(todo => todo.get('id') !== action.id)
      return state.set('todos', not_deleted_todos)

    default:
      /*console.log('State: '+state)
      console.log('Action: '+action)*/
      return state
  }
}

export default reducer