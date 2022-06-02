import { createSlice } from '@reduxjs/toolkit'

export const notification = createSlice({
	name: 'notification',
	initialState: {
		isHide: true,
        message: "",
	},
	reducers: {
        setIsHide: (state, action) => {
            state.isHide = action.payload
        },
        setMessage: (state, action) => {
            state.message = action.payload
        },
	}
})

export const { setIsHide, setMessage } = notification.actions

export default notification.reducer