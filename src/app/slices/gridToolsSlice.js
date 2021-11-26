import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedTool: 'Write'
}

export const gridToolSlice = createSlice({
    name: 'gridTools',
    initialState,
    reducers: {
        setSelectedTool : (state, action) => {
            state.selectedTool = action.payload
        }
    }
})

export const { setSelectedTool } = gridToolSlice.actions

export default gridToolSlice.reducer;