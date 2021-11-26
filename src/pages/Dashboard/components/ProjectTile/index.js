import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProjectTile.scss';

const ProjectTile = ({ project, handleDeleteProject }) => {
   
    const [isConfirmShowing, setConfirmShowing] = useState(false);

    const { title, _id } = project;
    const handleDelete = e => {
        e.stopPropagation();
        e.preventDefault();
        setConfirmShowing(true);
    }

    const handleYesClick = e => {
        e.stopPropagation();
        e.preventDefault();
        handleDeleteProject(_id);
        setConfirmShowing(false);
    }

    const handleNoClick = e => {
        e.stopPropagation();
        e.preventDefault();
        setConfirmShowing(false);
    }

    return (
        <div className="ProjectTile">
            <Link to={`/builder/${_id}`} >
                <h3 className="ProjectTile__title">{title}</h3>
            </Link>
            <button className="ProjectTile__button" onClick={handleDelete}>Delete</button>
            {isConfirmShowing && (
            <>
                <p>Are you sure?</p>
                <div>
                    <button onClick={handleYesClick}>Yes</button>
                    <button onClick={handleNoClick}>No</button>
                </div>
            </>
            )}
        </div>   
    )
}

export default ProjectTile;