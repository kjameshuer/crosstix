import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { redoHistory } from 'app/slices/gridSlice';

const Redo = () => {
    const {history, historyPosition} = useSelector(state => state.gridInfo);
    const dispatch = useDispatch();

    const handleOnClick = () => {
        if (history.length === 0 || historyPosition === history.length - 1) return;
        dispatch(redoHistory());
    }

    return (
        <div className='Redo'> 
            <button disabled={historyPosition === history.length - 1} onClick={handleOnClick}>Redo</button>
        </div>
    );
}

export default Redo;