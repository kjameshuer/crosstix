import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedColor: '#a3c2c2',
    projectColors: [],
    recentColors: []
}

export const colorSelectorSlice = createSlice({
    name: 'colorInfo',
    initialState,
    reducers:{
        setSelectedColor: (state, action) => {
            state.selectedColor=action.payload
        },
        addToProjectColors: (state,action) => {
            const newList = (state.projectColors.length > 9) ? state.projectColors.slice(1) : state.projectColors;
            newList.push(action.payload)
            state.projectColors = newList;
        },
        removeProjectColor: (state, action) => {
            state.projectColors = [...state.projectColors.slice(0,action.payload), ...state.projectColors.slice(action.payload+1)]
        },
        updateRecentColors: (state,action) => {
            const newList = (state.recentColors.length > 9) ? state.recentColors.slice(1) : state.recentColors;
            newList.push(action.payload)
            state.recentColors = newList;
        }
    }
})

export const {setSelectedColor, addToProjectColors, removeProjectColor, updateRecentColors} = colorSelectorSlice.actions

export default colorSelectorSlice.reducer