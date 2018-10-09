import { VISIBILITY_FILTERS } from '../constants'

export const getTodosState = store => store.todos

export const getTodoById = (store, id) => (
  getTodosState(store) ? { ...getTodosState(store).byIds[id], id } : {}
)

export const getTodoList = (store) => (
  getTodosState(store) ? getTodosState(store).allIds : []
)

export const getTodos = store => (
  getTodoList(store).map(id => getTodoById(store, id))
)

export const getTodosByVisibilityFilter = (store, visibiltyFilters) => {
  const allTodos = getTodos(store)
  switch (visibiltyFilters) {
    case VISIBILITY_FILTERS.COMPLETED: 
      return allTodos.filter(item => item.completed)
    case VISIBILITY_FILTERS.INCOMPLETE:
      return allTodos.filter(item => !item.completed)
    case VISIBILITY_FILTERS.ALL:
    default:
      return allTodos
  }
}