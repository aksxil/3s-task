import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Tree from './components/Tree/Tree';
import { hierarchyData } from './data/hierarchyData';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Sidebar />
      <div className="main-content">
        <Tree data={hierarchyData} />
      </div>
    </div>
  );
};

export default App;

