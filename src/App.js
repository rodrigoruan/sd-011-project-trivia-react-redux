import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Settings from './components/Settings';
import Game from './components/Game';
import Feedback from './components/Feedback';
import Ranking from './components/Ranking';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/settings" component={ Settings } />
      <Route path="/game" component={ Game } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/ranking" component={ Ranking } />
    </Switch>
  );
}

export default App;
