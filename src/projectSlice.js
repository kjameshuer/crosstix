import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    projects: [],
    activeProject: null
}

export const getProjects = createAsyncThunk(
    'projects/get',
    async () => {
        const response = await axios.get('/api/projects')
        return response.data;
    }
)

export const projectSlice = createSlice({
    name: 'projectInfo',
    initialState,
    reducers: {
        // populateProjects: (state, action) => {
        //     state.projects = action.payload.projects;
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(getProjects.fulfilled, (state, action) => {
            state.projects = action.payload.projects
        })
    },
})

export const { populateProjects } = projectSlice.actions;

export default projectSlice.reducer;