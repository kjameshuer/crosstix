import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedColor: '#a3c2c2',
    recentColors: []
}

export const colorSelectorSlice = createSlice({
    name: 'colorInfo',
    initialState,
    reducers: {
        setSelectedColor: (state, action) => {
            state.selectedColor = action.payload
        },

        updateRecentColors: (state, action) => {
            const newList = (state.recentColors.length > 9) ? state.recentColors.slice(1) : state.recentColors;
            newList.push(action.payload)
            state.recentColors = newList;
        }
    }
})

export const { setSelectedColor, updateRecentColors } = colorSelectorSlice.actions

export default colorSelectorSlice.reducer