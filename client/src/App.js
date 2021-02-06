import "./App.css";
import ResultPage from "./components/ResultPage";
import SearchPage from "./components/SearchPage";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Link to="/"></Link>
      <Switch>
        <Route path="/" exact component={SearchPage} />
        <Route path="/results" exact component={ResultPage} />
      </Switch>
    </Router>
  );
}

export default App;
