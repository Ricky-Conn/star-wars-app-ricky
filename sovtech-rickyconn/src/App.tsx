import React, {useEffect} from 'react';
import './App.css';
import Page from "./Components/Page"
import CharacterSummary from "./Components/CharacterSummary"
import Pagination from "./Components/Pagination"
import CharacterDetails from "./Components/CharacterDetails"
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { render } from "react-dom";
import { createUseStyles, ThemeProvider, useTheme } from "react-jss";

useEffect(() =>{
  const theme = {
    background: "#f7df1e",
    color: "#24292e"
  };
},[])

const useStyles = createUseStyles({
  wrapper: {
    padding: 40,
    background: ({ theme }) => theme.background,
    textAlign: "left"
  },
  title: {
    font: {
      size: 40,
      weight: 900
    },
    color: ({ theme }) => theme.color
  },
  link: {
    color: ({ theme }) => theme.color,
    "&:hover": {
      opacity: 0.5
    }
  }
});

const Comp = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <Router>
      <div>
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
};

const App = () => (
  <ThemeProvider theme={theme}>
    <Comp />
  </ThemeProvider>
);

render(<App />, document.getElementById("root"));
