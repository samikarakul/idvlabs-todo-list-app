import { createSlice } from '@reduxjs/toolkit'

export const newTodoModal = createSlice({
	name: 'newTodoModal',
	initialState: {
		isHide: true,
	},
	reducers: {
        setIsHide: (state, action) => {
            state.isHide = action.payload
        },
        
	}
})

export const { setIsHide } = newTodoModal.actions

export default newTodoModal.reducer