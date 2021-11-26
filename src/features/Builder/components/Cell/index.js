import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateGrid, updateHistory } from 'app/slices/gridSlice';
import { setSelectedColor } from 'app/slices/colorSelectorSlice'
import { setSelectedTool } from 'app/slices/gridToolsSlice'
import './Cell.scss';
import { cellColor } from 'app/constants';


const Cell = ({ column, row, keyForCell }) => {
    const dispatch = useDispatch();
    const { grid, isMouseDown } = useSelector(state => state.gridInfo);
    const { selectedColor } = useSelector(state => state.colorInfo);
    const { selectedTool } = useSelector(state => state.gridTools);

    const handleClick = () => {
        if (selectedTool === 'Write') {
            dispatch(updateHistory({ before: { column, row, color: grid[`${column}${row}`].color }, after: { column, row, color: selectedColor } }))
            dispatch(updateGrid({ column, row, color: selectedColor }))
        }
        if (selectedTool === 'Erase') {
            dispatch(updateHistory({ before: { column, row, color: grid[`${column}${row}`].color }, after: { column, row, color: cellColor } }))
            dispatch(updateGrid({ column, row, color: cellColor }))
        }
        if (selectedTool === 'Copy') {
            dispatch(setSelectedColor(grid[`${column}${row}`].color))
            dispatch(setSelectedTool('Write'))
        }
    }

    const handleMouseEnter = (column, row, color) => {
        if (isMouseDown) {
            if (selectedTool === 'Write') {
                dispatch(updateHistory({ before: { column, row, color: grid[`${column}${row}`].color }, after: { column, row, color } }))
                dispatch(updateGrid({ column, row, color }))
            }
            if (selectedTool === 'Erase') {
                dispatch(updateHistory({ before: { column, row, color: grid[`${column}${row}`].color }, after: { column, row, color: cellColor } }))
                dispatch(updateGrid({ column, row, color: cellColor }))
            }
        }
    }

    const gridFill = (grid.hasOwnProperty(`${column}${row}`)) ? grid[`${column}${row}`].color : '#ffffff'
    const style = { backgroundColor: gridFill }
    
    return (
        <div key={keyForCell} style={style} className="Cell" onMouseDown={handleClick} onMouseEnter={() => handleMouseEnter(column, row, selectedColor)}>

        </div>
    )
}

export default Cell;