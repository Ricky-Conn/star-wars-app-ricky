import React from 'react';
import './App.css';
import Page from "./Components/Page"
import CharacterSummary from "./Components/CharacterSummary"
import Pagination from "./Components/Pagination"
import CharacterDetails from "./Components/CharacterDetails"

function App() {
  return (
    <div className="App">
        <h1>App</h1>
        <Page/>
        <CharacterSummary/>
        <Pagination/>
        <CharacterDetails/>
    </div>
  );
}

export default App;
