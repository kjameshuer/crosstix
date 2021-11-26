import React from 'react';
import Cell from '../Cell';
import { useSelector, useDispatch } from 'react-redux';
import { toggleIsMouseDown } from './gridSlice';
import { baseNumberLetter, backgroundColor } from 'app/constants';
import './GridContainer.scss'

const GridContainer = () => {
    const {grid, columns, rows} = useSelector(state => state.gridInfo);
    const dispatch = useDispatch()
    const displaySortedGrid = () => {
        const sortedGrid = [];
        for(let rowNum = 1; rowNum <= rows; rowNum++){
            const sortedRow = [];
            let currentLetter = '';
            for(let col = 1; col <= columns; col++) {
                if ((col - 1) + baseNumberLetter > 90) {
                    // double letter
                    const firstLetter = String.fromCharCode(((col - 1) / 26) - 1 + baseNumberLetter) 
                    const secondLetter = String.fromCharCode(((col - 1) % 26) + baseNumberLetter)
                    currentLetter = `${firstLetter}${secondLetter}`;
                } else {
                    // single letter
                    currentLetter = String.fromCharCode((col - 1) + baseNumberLetter);
                }

                const key = `${currentLetter}${rowNum}`
                const square = grid[key];
                // const column = square ? square.column : currentLetter;
                // const row = square ? square.row : rowNum;
                // const color = square ? square.color : "#ffffff"
                
                // const {column, row, color} = grid[key];
                
                sortedRow.push(<Cell               
                    keyForCell={key} 
                    key={key}    
                    color={ square ? square.color : "#ffffff"}
                    column={square ? square.column : currentLetter}                  
                    row={square ? square.row : rowNum}                    
              />);
            }
            sortedGrid.push(sortedRow)
        }
        return sortedGrid
    }

    const handleOnMouseDown = () => dispatch(toggleIsMouseDown(true));
    const handleOnMouseExit = () => dispatch(toggleIsMouseDown(false));
    const handleOnMouseUp = () => dispatch(toggleIsMouseDown(false));

    return (
     
    <div className="GridContainer" onMouseDown={handleOnMouseDown} onMouseUp={handleOnMouseUp} onMouseExit={handleOnMouseExit}>
        {displaySortedGrid()}
    </div>
       
    )
}

export default GridContainer;