import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedColor } from 'features/Builder/components/ColorSelector/colorSelectorSlice';
import { removeProjectColor, addToProjectColors } from 'projectSlice';
import './ProjectColors.scss'

const ProjectColors = () => {

    const [isSelected, setIsSelected] = useState(null)

    const dispatch = useDispatch()
    const { selectedColor } = useSelector(state => state.colorInfo);
    const { projectColors } = useSelector(state => state.projectsInfo.activeProject);
    const { selectedTool } = useSelector(state => state.gridTools);

    const handleOnClick = (color, itt) => {
        //setIsSelected(itt)
        if (selectedTool === "Write") {
            dispatch(setSelectedColor(color))
        }
        if (selectedTool === "Erase") {
            dispatch(removeProjectColor(itt))
        }
    }
    const handleAddClick = () => {
        dispatch(addToProjectColors(selectedColor));
    }


    const displayProjectColors = () => {
        if (!projectColors) return <div></div>
        return projectColors.map((color, itt) => {
            const style = {
                backgroundColor: color
            }

            const theClassName = "ProjectColors__color";

            return (
                <div
                    key={`${color}-${Date.now()}-${Math.random()*300}`}
                    className={theClassName}
                    style={style}
                    onClick={() => handleOnClick(color, itt)}
                // onMouseEnter={()=>handleMouseEnter(itt)}
                />
            )
        })
    }
    return (
        <div className="ProjectColors">
            <h3>Project Colors</h3>
            <div className="ProjectColor__colors">
                {displayProjectColors()}
                <button title="Add current color to Project Colors" onClick={handleAddClick}>+</button>
            </div>
        </div>
    )
}

export default ProjectColors