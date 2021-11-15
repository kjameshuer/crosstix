import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'authSlice'
import gridReducer from 'features/Builder/components/GridContainer/gridSlice';
import gridToolsReducer from 'features/Builder/components/GridTools/gridToolsSlice'
import colorSelectorReducer from 'features/Builder/components/ColorSelector/colorSelectorSlice'
import projectsReducer from 'projectSlice';
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