import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectTile.scss';


const ProjectTile = ({ project }) => {
    console.log("project", project)
    const { title, _id } = project;
    return (
        <Link to={`/builder/${_id}`} >
            <div className="ProjectTile">
                <h3 className="ProjectTile__title">{title}</h3>
            </div>
        </Link>
    )
}

export default ProjectTile;