import React, { useEffect } from 'react';
import ProjectList from './components/ProjectList/';
import { useDispatch } from 'react-redux';
import { clearActiveProject } from 'projectSlice';
import './Dashboard.scss'

const Dashboard = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearActiveProject())
    })
    return (
        <div className="Dashboard">
            <h2>Dashboard</h2>
            <ProjectList />
        </div>
    )
}

export default Dashboard