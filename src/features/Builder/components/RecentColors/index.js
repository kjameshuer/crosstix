import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToProjectColors } from 'features/Builder/components/ColorSelector/colorSelectorSlice';
import './RecentColors.scss';

const RecentColors = () => {

const {recentColors} = useSelector(state => state.colorInfo);
    const dispatch = useDispatch();
    const handleClick = color => {
        dispatch(addToProjectColors( color ))
    }
    
    const displayRecentColors = () => {
      return recentColors.map(color => {
            const colorStyle = {
                backgroundColor: color
            }
            return <div onClick={()=>handleClick(color)} className="RecentColors__color" style={colorStyle}></div>
        })
    }
    
    return (
        <div className="RecentColors">
            <h3>Recent Colors</h3>
            <div className="RecentColors__colors">
                {displayRecentColors()}
            </div>
        </div>
    )
}

export default RecentColors;