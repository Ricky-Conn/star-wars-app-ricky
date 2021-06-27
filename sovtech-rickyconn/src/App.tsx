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
    document.body.style.textAlign = "-webkit-center"
  },[])

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path={["/:pageNum?", "/Page/:pageNum?"]} exact render={() => 
                                <div>
                                  <h1 style={{color: 'white', margin: '1.8%'} as React.CSSProperties}>Characters</h1>
                                  <Page/> 
                                  <Pagination/>
                                </div>
                                  }/>
          <Route path="/Character/:personName" component={CharacterDetails}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
