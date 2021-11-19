import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProject, clearActiveProject, saveProject } from 'projectSlice';
import ProjectColors from './components/ProjectColors';
import RecentColors from './components/RecentColors';
import GridTools from './components/GridTools';
import Undo from './components/Undo';
import Redo from './components/Redo';
import GridContainer from './components/GridContainer';
import ColorSelector from './components/ColorSelector/ColorSelector';
import './Builder.scss';

const Builder = props => {
  const projectId = props.match.params.id;
  const dispatch = useDispatch();
  const projectsInfo = useSelector(state => state.projectsInfo)
  const [mousePosition, updateMousePosition] = useState(['A', '1'])
  const [toolModalIsOpen, setToolModalIsOpen] = useState(true)
  const [historyPosition, setHistoryPosition] = useState(0);

  useEffect(() => {
    dispatch(getProject(projectId))

  }, [projectsInfo.hasActiveProject])


  const handleToolToggleClick = () => {
    setToolModalIsOpen(!toolModalIsOpen);
  }

  const handleSave = () => {
    dispatch(saveProject())
  }

  const showBuilder = () => {
    const { title } = projectsInfo;
    return (
      <>
        {projectsInfo.hasActiveProject && <>
          <div className="Builder__work-area">
            <h3>{title}</h3>
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
              <button onClick={handleSave}>Save</button>
            </div>
          </div></>}
      </>
    )
  }

  return (
    <>
      {!projectsInfo && <h3>Getting project</h3>}
      {projectsInfo && showBuilder()}

    </>
  )
}

export default Builder;