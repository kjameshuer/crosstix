import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './GridTools.scss';
import {setSelectedTool} from '../../../../app/slices/gridToolsSlice';

const GridTools = () =>{

    const selectedTool = useSelector(state => state.gridTools.selectedTool);
    const dispatch = useDispatch()
    const buttons = ['Write', 'Erase', 'Copy']

    const handleButtonClick = tool => {
        if (selectedTool === tool) return;
        dispatch(setSelectedTool(tool));
    }

    const displayButtons = () => {
        return buttons.map(button => {
            const finalClassName = (selectedTool === button) ? 'GridTools__button GridTools__button--selected' : 'GridTools__button';
            return <button key={button} onClick={()=>handleButtonClick(button)} className={finalClassName}>{button}</button>
        })
    }

    return (
        <>
        <div className="GridTools">
            {displayButtons()}
      
        </div>
       
        </>
    )
}

export default GridTools