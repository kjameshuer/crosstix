import React, { useState } from 'react';
import { HexColorPicker, HexColorInput } from "react-colorful";
import { useDispatch, useSelector } from 'react-redux';
import { updateRecentColors, setSelectedColor } from './colorSelectorSlice';
import { addToProjectColors } from 'projectSlice'
import './ColorSelector.scss';

const ColorSelector = () => {

    const { selectedColor } = useSelector(state => state.colorInfo);
    const [pickerVisible, setPickerVisible] = useState(true);

    const dispatch = useDispatch();

    const handleChange = col => {
        dispatch(setSelectedColor(col));
        dispatch(updateRecentColors(col));        
    }

    const handlePickerClick = () => {
      //  if (pickerVisible) setPickerVisible(false)
      //  else setPickerVisible(true);
    }
    const displayPicker = () => {
        return (
            <div className="ColorSelector__picker">
            <HexColorPicker color={selectedColor} onChange={handleChange} />

            </div>
        )
    }
    const buttonText = (pickerVisible) ? `Close` : `Select a colour`;
    const colorStyle = {backgroundColor:selectedColor}
    return (
        <div className="ColorSelector">
            {displayPicker()}
           {/* <button onClick={handlePickerClick}>{buttonText}</button> */}
           <div className="ColorSelector__display">
           <div onClick={handlePickerClick} style={colorStyle} className="ColorSelector__current-color"></div>
           <HexColorInput color={selectedColor} onChange={handleChange} />
           
            </div>
        </div>
    )
}

export default ColorSelector;