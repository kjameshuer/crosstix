import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { setGrid } from 'features/Builder/components/GridContainer/gridSlice'

import axios from 'axios';
import _ from 'underscore';

const initialState = {
    projects: [],
    hasActiveProject: false,
    activeProject: {
        projectColors: [],
        title: '',
        rows: 50,
        columns: 50,
        projectId: null
    }
}

export const getProjects = createAsyncThunk(
    'projects/get',
    async () => {
        const response = await axios.get('/api/projects', {

            headers: {
                'Authorization': localStorage.getItem('crosstixToken')
            }
        })
        console.log("response", response.data)
        return response.data;
    }
)
export const getProject = createAsyncThunk(
    'projects/getOne',
    async (id, thunkAPI) => {
        console.log("Sending id", id)
        const response = await axios.get('/api/project', {
            params: {
                projectId: id
            },
            headers: {
                'Authorization': localStorage.getItem('crosstixToken')
            }
        })
        console.log("get one project", response);
        thunkAPI.dispatch(setGrid(response.data.gridData))
        return response.data
    }
)
export const newProject = createAsyncThunk(
    'projects/new',
    async (info) => {
        const response = await axios.post('/api/project/new',
            { title: info.title },
            {
                headers: {
                    'Authorization': localStorage.getItem('crosstixToken')
                }

            })
        console.log("new project response", response.data)
        return response.data;
    }
)

export const saveProject = createAsyncThunk(
    'projects/save',
    async (info, thunkAPI) => {
        const { gridInfo, projectsInfo } = thunkAPI.getState()
     
        const colorTiles = Object.fromEntries(
            Object.entries(gridInfo.grid).filter(
                ([key, value]) => value['color'] !== '#ffffff' 
            )
        )
        
        const updatedProject = {            
            projectColors: projectsInfo.activeProject.projectColors,
            rows: projectsInfo.activeProject.rows,
            columns: projectsInfo.activeProject.columns,
            grid: colorTiles,
            projectId: projectsInfo.activeProject.projectId
        }
        console.log("UPDATED PROJECT", updatedProject)
        const response = await axios.post('/api/project/save',
            updatedProject,
            {
                headers: {
                    'Authorization': localStorage.getItem('crosstixToken')
                }
            })
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
        clearActiveProject: (state) => {
            state.activeProject = null;
            state.hasActiveProject = false;
        },
        addToProjectColors: (state, action) => {
            const newList = (state.activeProject.projectColors.length > 9) ? state.activeProject.projectColors.slice(1) : state.activeProject.projectColors;
            newList.push(action.payload)
            state.activeProject.projectColors = newList;
        },
        removeProjectColor: (state, action) => {
            state.projectColors = [...state.activeProject.projectColors.slice(0, action.payload), ...state.activeProject.projectColors.slice(action.payload + 1)]
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProjects.fulfilled, (state, action) => {
            state.projects = action.payload
        })
        builder.addCase(getProject.fulfilled, (state, action) => {
            console.log("ACTION>PAY>OAYD", action.payload)
            const { project, gridData } = action.payload;
            const {title, projectColors, rows, columns, gridId, _id} = project;
            console.log("title", title)
            
            
            state.activeProject = {projectColors, title, rows, columns, gridId, projectId: _id};
            state.hasActiveProject = true;
          
            
        })
        builder.addCase(newProject.fulfilled, (state, action) => {
            console.log("the action???", action.payload)
            state.projects.push(action.payload);
        })
        builder.addCase(saveProject.fulfilled, (state, action) => {

            //    state.activeProject = action.payload;
        })
    },
})

export const { clearActiveProject, addToProjectColors, removeProjectColor } = projectSlice.actions;

export default projectSlice.reducer;