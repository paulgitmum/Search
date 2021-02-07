import "./App.css";
import React from "react";
import ResultPage from "./components/ResultPage";
import SearchPage from "./components/SearchPage";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { createContext } from "react";


export const MyContext = createContext();
const initialState = {
  query: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_QUERY":
      return {
        ...state,
        query: action.payload,
      }
  }
};


function App() {
  
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <MyContext.Provider value={{state,dispatch}}>
      <Router>
        <Link to="/"></Link>
        <Switch>
          <Route path="/" exact component={SearchPage} />
          <Route path="/results" exact component={ResultPage} />
        </Switch>
      </Router>
    </MyContext.Provider>
  );
}

export default App;
