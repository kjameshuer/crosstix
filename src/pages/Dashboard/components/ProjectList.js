import React, { useEffect } from 'react';
import { getProjects } from 'projectSlice';
import { useDispatch, useSelector } from 'react-redux';

const ProjectList = () => {

    const dispatch = useDispatch();
    const projects = useSelector(state => state.projectsInfo.projects);
    useEffect(() => {
        dispatch(getProjects());
    }, [])
    const displayProjects = () => {
        if (!projects) return
        return projects.map(project => {
            return (
                <div key={project.id}>
                    <h2>{project.title}</h2>
                </div>
            )
        })
    }
    return (
        <div className="ProjectList">
            <h2>My projects</h2>
            {displayProjects()}
        </div>
    )
}

export default ProjectList