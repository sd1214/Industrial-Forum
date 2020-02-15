import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// //Pages
import home from "./Pages/homepage";
import signup from "./Pages/signup";
import login from "./Pages/login";
import card from "./Pages/card"


class App extends Component {
  render() {
    return (
      // <div>
      //   <h1>ef2</h1>
      // </div>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/homepage'component={home} />
            <Route exact path='/login'component={login} />
            <Route exact path='/signup'component={signup} />
            <Route exact path='/card'component={card} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;