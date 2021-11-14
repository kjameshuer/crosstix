import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import './MyProjects.css';

const MyProjects = ({isLoggedIn}) => {

const [projects, setProjects] = useState([])

    useEffect(()=>{
        setProjects([{name:'Project 1', id: 0},{name: 'Project 2', id: 1},{name: 'Project 3', id: 2}])
    },[])

    const displayProjects = () => {
      //  if (projects.length <= 0) return;
        return projects.map((project)=>{
            return (
                <div>
                    <h3>
                    <Link to={`/builder/${project.id}`} >{project.name}</Link>
                    </h3>
                </div>
            )
        })
    }
    if (!isLoggedIn) return null
    return (
        <div className="MyProjects">
            <div className="MyProjects__list">
                {displayProjects()}
            </div>
        </div>
    )
}

export default MyProjects;