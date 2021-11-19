import React, { useEffect } from 'react';
import ProjectTile from '../ProjectTile';
import CreateTile from '../CreateTile';
import './ProjectList.scss';
import { getProjects } from 'projectSlice';
import { useDispatch, useSelector } from 'react-redux';

const ProjectList = () => {

    const dispatch = useDispatch();
    const projects = useSelector(state => state.projectsInfo.projects);
    useEffect(() => {
        if (projects.length <= 0) {
            dispatch(getProjects());
        }
    }, [])


    const displayProjects = () => {
        return projects.map(project => {
            return (
                <ProjectTile key={project.id} project={project} />
            )
        })
    }
    return (
        <div className="ProjectList">
            <CreateTile />
            {projects && displayProjects()}
        </div>
    )
}

export default ProjectList