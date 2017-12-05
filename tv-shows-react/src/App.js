import React from 'react';
import Header from './Common/Header';
import './css/style.css';
import { Switch, Route, Redirect } from "react-router-dom";
import MainPage from './Main/MainPage';
import SinglePage from './Main/SinglePage';
import SearchPage from './Main/SearchPage';

class App extends React.Component {
  render() {

    return (
      <div className="hasbg">
        <Header />
        <Switch>
          <Redirect exact from="/" to="/main" />
          <Route exact path="/main" component={MainPage} />
          <Route exact path="/show/:id" component={SinglePage} />
          <Route exact path="/search/:searchTerm" component={SearchPage} />
          <Redirect exact from="/show" to="/main" />
        </Switch>
      </div>
    );
  }
}

export default App;
