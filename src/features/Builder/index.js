import React, { useState } from 'react';
import ProjectColors from './components/ProjectColors';
import RecentColors from './components/RecentColors';
import GridTools from './components/GridTools';
import Undo from './components/Undo';
import Redo from './components/Redo';
import GridContainer from './components/GridContainer';
import ColorSelector from './components/ColorSelector/ColorSelector';
import './Builder.scss';

const Builder = () => {


  const [mousePosition, updateMousePosition] = useState(['A', '1'])
  const [toolModalIsOpen, setToolModalIsOpen] = useState(true)
  const [historyPosition, setHistoryPosition] = useState(0);
  const handleToolToggleClick = () => {
    setToolModalIsOpen(!toolModalIsOpen);
  }

  return (
    <>
      <div className="Builder__work-area">
        <GridContainer />
      </div>
      <div className={(toolModalIsOpen) ? `Builder__tool-area Builder__tool-area--open` : `Builder__tool-area`}>
        <div className="Builder__tool-container">
          <GridTools />
          <ColorSelector />
          <ProjectColors />
          <RecentColors />
          <Undo />
          <Redo />
          <h4>{`${mousePosition[0]}${mousePosition[1]}`}</h4>
          <div onClick={handleToolToggleClick} className="Builder__tool_toggle">{(toolModalIsOpen) ? '>' : '<'}</div>
        </div>
      </div>
    </>
  )
}

export default Builder;