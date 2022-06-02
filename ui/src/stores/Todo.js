import { createSlice } from '@reduxjs/toolkit'

export const todos = createSlice({
	name: 'todos',
	initialState: {
        orjTodos: [],
		todos: [],
        todoItem: {},
	},
	reducers: {
        setTodos: (state, action) => {
            state.todos = action.payload;
            state.orjTodos = action.payload;
        },
        updateTodo: (state, action) => {
            state.todos = [...state.todos.filter(t => t.todoId != action.payload.todoId), action.payload]
            state.orjTodos = state.todos; 
        },
        addTodo: (state, action) => {
            state.todos = [...state.todos, action.payload]
            state.orjTodos = state.todos; 
        },
        filterTodosWithTodoId: (state,action) => {
            state.todos = state.todos.filter(t => t.todoId != action.payload)
            state.orjTodos = state.todos; 
        },
        setTodoItem: (state, action) => {
            state.todoItem = action.payload
        },
        searchTodo: (state, action) => {
            if(state.todos.length == 0 && state.orjTodos.length != 0) state.todos = state.orjTodos;
            state.todos = state.todos.filter(t => t.title.includes(action.payload))
            if(!action.payload || action.payload.title == "") state.todos = state.orjTodos; 
        }
	}
})

export const { setTodos, filterTodosWithTodoId, setTodoItem,updateTodo,addTodo, searchTodo } = todos.actions

export default todos.reducer