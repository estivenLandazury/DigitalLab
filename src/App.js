import React from 'react';
import logo from './logo.svg';
import './App.css';

import Reader from './components/reader'
import { Provider } from "react-redux"
import Store from "./components/Redux/store"

function App() {
  return (
    <div className="App">
      <Provider store={Store}>

        <Reader></Reader>
      </Provider>

    </div>
  );
}

export default App;
