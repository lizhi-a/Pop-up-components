import React, { memo, useState } from 'react';

import ProjectDetail from './pages/project_detail'

import './App.css';

export default memo(function App() {
  const [isDisplay, setDisplay] = useState(false)
  const onNewProjectClick = () => {
    setDisplay(true)
  }

  return (
    <div className="App">
      <button onClick={onNewProjectClick} id="new_project" >新建项目</button>
      <ProjectDetail display={isDisplay} changeDisplay={setDisplay} />
    </div>
  );
})
