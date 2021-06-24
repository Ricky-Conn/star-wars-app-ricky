import React, {useEffect} from 'react';
import './App.css';
import Page from "./Components/Page"
import CharacterSummary from "./Components/CharacterSummary"
import Pagination from "./Components/Pagination"
import CharacterDetails from "./Components/CharacterDetails"
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {

  useEffect(() =>{
    document.body.classList.add('background-color');
  },[])

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Page}/>
          <Route path="/Page" exact component={Page}/>
          <CharacterSummary/>
          <Pagination/>
          <Route path="/Character" exact component={CharacterDetails}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
