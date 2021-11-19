import React, { useState } from 'react'
import './CreateTile.scss'
import { useDispatch } from 'react-redux';
import { newProject } from 'projectSlice';


const CreateTile = () => {
    const [showInput, setShowInput] = useState(false);
    const [inputText, setInputText] = useState("")

    const dispatch = useDispatch();

    const handleCreateButtonClick = () => {
        dispatch(newProject({ title: inputText }))
        setInputText('');
        setShowInput(false);
    }

    const handleShowButtonClick = () => {
        setShowInput(true)
    }

    const handleTextChange = e => {
        setInputText(e.target.value);
    }

    const displayTile = () => {
        if (showInput) {
            return (
                <>
                    <textarea autoFocus maxLength={40} className="CreateTile__input" type="text" value={inputText} onChange={handleTextChange} />

                    <button onClick={handleCreateButtonClick}>Create</button>
                </>
            )
        } else {
            return (
                <>
                    <button className="CreateTile__add" onClick={handleShowButtonClick}>+</button>
                    <h3 className="CreateTile__title">Make a new project</h3>
                </>
            )
        }

    }

    return (
        <div className="CreateTile">
            {displayTile()}
        </div>
    )
}

export default CreateTile