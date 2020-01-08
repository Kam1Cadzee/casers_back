import React from 'react';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
     <p>Empty project</p>
      <p>{process.env.NODE_ENV}</p>
    </div>
  );
}

export default App;
