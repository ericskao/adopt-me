import ReactDOM from "react-dom";
import SearchParams from "./SearchParams.jsx";
import { StrictMode, useState } from "react";
import Details from "./Details.jsx";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ThemeContext from "./ThemeContext.jsx";

const App = () => {
  const theme = useState("black");
  return (
    <StrictMode>
      <ThemeContext.Provider value={theme}>
        <div>
          <Router>
            <header>
              <Link to="/">
                <h1>Adopt Me!</h1>
              </Link>
            </header>
            <Switch>
              <Route path="/details/:id">
                <Details />
              </Route>
              <Route path="/">
                <SearchParams />
              </Route>
            </Switch>
          </Router>
        </div>
      </ThemeContext.Provider>
    </StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
