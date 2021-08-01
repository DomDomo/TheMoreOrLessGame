import Game from "./Game";
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
require("dotenv").config();

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/game">
            <Game />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
