import React, {useState} from 'react';
import { HexColorPicker, HexColorInput } from "react-colorful";
import { useDispatch , useSelector} from 'react-redux';
import { setSelectedColor, addToProjectColors, updateRecentColors } from './colorSelectorSlice';

const ColorSelector = () => {

   const {selectedColor} = useSelector(state=>state.colorInfo);

    const dispatch = useDispatch();

    const handleChange = col => {
        dispatch(setSelectedColor(col));
        dispatch(updateRecentColors(col));
    }

    const handleClick = () => {
        dispatch(addToProjectColors(selectedColor));
    }

    return (
        <div className="ColorSelector">            
             <HexColorPicker color={selectedColor} onChange={handleChange} />
             <HexColorInput color={selectedColor} onChange={handleChange} />
             <br />
             <button onClick={handleClick}>Add current color to Project Colors</button>            
        </div>
    )
}

export default ColorSelector;