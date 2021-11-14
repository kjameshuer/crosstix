import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedColor, removeProjectColor } from 'features/Builder/components/ColorSelector/colorSelectorSlice';
import './ProjectColors.scss'

const ProjectColors = () => {
    
    const [isSelected, setIsSelected] = useState(null)

    const dispatch = useDispatch()
    const {projectColors} = useSelector(state => state.colorInfo);
    const {selectedTool} = useSelector(state => state.gridTools);

    const handleOnClick = (color, itt) => {
        //setIsSelected(itt)
        if (selectedTool === "Write"){
        dispatch(setSelectedColor(color))
        }
        if (selectedTool === "Erase"){
            dispatch(removeProjectColor(itt))
        }
    }


    
    const displayProjectColors = () => {
        return projectColors.map((color, itt) => {
            const style = {
                backgroundColor: color
            }

            const theClassName = "ProjectColors__color";

            return (
                <div
                key={`${color}`}
                className={theClassName}
                style={style}
                onClick={()=>handleOnClick(color, itt)}
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
            </div>          
        </div>
    )
}

export default ProjectColors