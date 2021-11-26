import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { undoHistory } from 'app/slices/gridSlice';

const Undo = () => {
    const {history, historyPosition} = useSelector(state => state.gridInfo);
    const dispatch = useDispatch();

    const handleOnClick = () => {
        if (history.length === 0) return;
        dispatch(undoHistory());
    }

    return (
        <div className='Undo'> 
            <button disabled={historyPosition === -1} onClick={handleOnClick}>Undo</button>
        </div>
    );
}

export default Undo;