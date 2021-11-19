import React, { useEffect } from 'react';
import ProjectList from './components/ProjectList/';
import './Dashboard.scss'

const Dashboard = () => {

    return (
        <div className="Dashboard">
            <h2>Dashboard</h2>
            <ProjectList />
        </div>
    )
}

export default Dashboard