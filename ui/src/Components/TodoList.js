import React from 'react'
import Todo from './Todo'
import ConfirmationModal from './ConfirmationModal'
import TodoEditModal from './TodoEditModal'
function TodoList({todos}) {

  return (
    <div className='h-100 w-100 px-4 py-4'>
        <ConfirmationModal/>
        <TodoEditModal/>
        <div className='position-absolute position-top-0 w-80'>
          {todos ? todos.map(todo => (
              <Todo todo={todo}/>
          )) : 
              <p>There is no todo to show...</p>
          }
        </div>
    </div>
  )
}

export default TodoList