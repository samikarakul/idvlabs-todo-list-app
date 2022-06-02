import { createSlice } from '@reduxjs/toolkit'

export const edit = createSlice({
	name: 'edit',
	initialState: {
		isHide: true,
	},
	reducers: {
        setIsHide: (state, action) => {
            state.isHide = action.payload
        },
        
	}
})

export const { setIsHide } = edit.actions

export default edit.reducer