import React from 'react';
import { HexColorPicker, HexColorInput } from "react-colorful";
import { useDispatch, useSelector } from 'react-redux';
import { updateRecentColors, setSelectedColor } from '../../../../app/slices/colorSelectorSlice';
import './ColorSelector.scss';

const ColorSelector = () => {

    const { selectedColor } = useSelector(state => state.colorInfo);

    const dispatch = useDispatch();

    const handleChange = col => {
        dispatch(setSelectedColor(col));
        dispatch(updateRecentColors(col));        
    }

    const displayPicker = () => {
        return (
            <div className="ColorSelector__picker">
                <HexColorPicker color={selectedColor} onChange={handleChange} />
            </div>
        )
    }

    const colorStyle = {backgroundColor:selectedColor}
    return (
        <div className="ColorSelector">
            {displayPicker()}
           <div className="ColorSelector__display">
           <div style={colorStyle} className="ColorSelector__current-color"></div>
           <HexColorInput color={selectedColor} onChange={handleChange} />
           
            </div>
        </div>
    )
}

export default ColorSelector;