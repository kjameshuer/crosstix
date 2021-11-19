import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateGrid, updateHistory } from 'features/Builder/components/GridContainer/gridSlice';
import { setSelectedColor } from 'features/Builder/components/ColorSelector/colorSelectorSlice'
import { setSelectedTool } from 'features/Builder/components/GridTools/gridToolsSlice'
import './Cell.scss';
import { cellColor } from 'app/constants';


const Cell = ({ color, column, row, keyForCell }) => {
    const dispatch = useDispatch();
    const { grid, isMouseDown } = useSelector(state => state.gridInfo);
    const { selectedColor } = useSelector(state => state.colorInfo);
    const { selectedTool } = useSelector(state => state.gridTools);

    const styles = {
        'backgroundColor': color
    }

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

    // const handleMouseEnter = (col, row) => {
    //     updateMousePosition([`${col}`,`${row}`]);
    // }
    const gridFill = (grid.hasOwnProperty(`${column}${row}`)) ? grid[`${column}${row}`].color : '#ffffff'

    const style = { backgroundColor: gridFill }
    const fontStyle = { color: gridFill }
    return (
        <div key={keyForCell} style={style} className="Cell" onMouseDown={handleClick} onMouseEnter={() => handleMouseEnter(column, row, selectedColor)}>
            {/* <span style={fontStyle} className="Cell__x">x</span> */}
        </div>
    )
}



export default Cell;