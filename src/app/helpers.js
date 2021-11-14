import { baseNumberLetter, cellColor } from "./constants";
export const setupGrid = (cols, rows)=> {
    const griddy = {};
    for(let col = 0; col< cols; col++) {
      for(let row = 1; row <= rows; row++) {
        let columnLetter = '';
        if (col + baseNumberLetter > 90) {
            // double letter
            const firstLetter = String.fromCharCode((col / 26) - 1 + baseNumberLetter) 
            const secondLetter = String.fromCharCode((col % 26) + baseNumberLetter)
            columnLetter = `${firstLetter}${secondLetter}`;
        } else {
            // single letter
            columnLetter = String.fromCharCode(col + baseNumberLetter);
        }
        
        const key = `${columnLetter}${row}`
        griddy[key] = {
          color: cellColor,
          column: columnLetter,
          row
        }
      }
    }
    return griddy;
  }