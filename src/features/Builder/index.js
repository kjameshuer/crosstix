import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProject, saveProject } from 'app/slices/projectSlice';
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
  const projectsInfo = useSelector(state => state.projectsInfo);

  useEffect(() => {
    dispatch(getProject(projectId));
  }, [dispatch, projectId])


  const handleSave = () => {
    dispatch(saveProject());
  }

  const showBuilder = () => {

    const title = projectsInfo.activeProject.title
    return (
      <>       
          <div className="Builder__header">
              {title && <h3>{title}</h3>}
              <GridTools />
              <div>
              <Undo />
              <Redo />
              </div>
              <button onClick={handleSave}>Save</button>              
            </div>           
          <div className="Builder__work-area">          
            <GridContainer />
          </div>
          <div className={`Builder__tool-area Builder__tool-area--open`}>
            <div className="Builder__tool-container"> 
              <ProjectColors />
              <ColorSelector />
              <RecentColors />                    
            </div>
          </div>
      </>
    )
  }

  return (
    <>
      {!projectsInfo && <h3>Getting project</h3>}
      {projectsInfo.activeProject && showBuilder()}

    </>
  )
}

export default Builder;