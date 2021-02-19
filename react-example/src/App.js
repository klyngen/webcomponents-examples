import './App.css';
import React from 'react';
import OldReactExample from './OldReactExample';
import ModernReactExample from './ModernReactExample';

const App = () => {
    return (
      <div className="App">
        <h1>Old component style</h1>
        <OldReactExample/>
        <hr/>

        <h1>Modern component style</h1>
        <ModernReactExample/>
        <hr/>
      </div>
    ); 
  
}

export default App;
