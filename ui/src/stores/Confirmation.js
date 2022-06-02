import { createSlice } from '@reduxjs/toolkit'

export const confirmation = createSlice({
	name: 'confirmation',
	initialState: {
		isHide: true,
	},
	reducers: {
        setIsHide: (state, action) => {
            state.isHide = action.payload
        },
        
	}
})

export const { setIsHide } = confirmation.actions

export default confirmation.reducer