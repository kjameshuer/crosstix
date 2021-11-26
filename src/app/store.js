import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'app/slices/authSlice'
import gridReducer from 'app/slices/gridSlice';
import gridToolsReducer from 'app/slices/gridToolsSlice'
import colorSelectorReducer from 'app/slices/colorSelectorSlice'
import projectsReducer from 'app/slices/projectSlice';
import reduxThunk from 'redux-thunk'

export const store = configureStore({
    reducer: {
        authInfo: authReducer,
        colorInfo: colorSelectorReducer,
        gridInfo: gridReducer,
        gridTools: gridToolsReducer,
        projectsInfo: projectsReducer
    },
    middleware: [reduxThunk]
});