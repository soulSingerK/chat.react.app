import React from 'react'

import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
import VisibilityFilters from './components/VisibilityFilters'

export default function TodoApp() {
  return (
    <div>
      <h1> todo List</h1>
      <AddTodo />
      <TodoList />
      <VisibilityFilters />
    </div>
  )
}