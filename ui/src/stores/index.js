import { configureStore } from '@reduxjs/toolkit'

import todoReducer from './Todo'
import confirmationReducer from './Confirmation'
import editReducer from './Edit'
import newTodoReducer from './NewTodoModal'
import notificationReducer from './Notification'
export default configureStore({
	reducer: {
		todo: todoReducer,
		confirmation: confirmationReducer,
		edit: editReducer,
		newTodo: newTodoReducer,
		notification: notificationReducer,
	},
})