import React from 'react';
import './App.css';
import TransportTable from './components/Table';
import AddTransportForm from './components/AddTransportForm';

const App: React.FC = () => {
  return (
    <div className="App">
     <AddTransportForm/>
      <TransportTable/>
    </div>
  );
}

export default App;
