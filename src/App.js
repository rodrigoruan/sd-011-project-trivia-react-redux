import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import logo from './trivia.png';
import './App.css';
import Login from './components/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/ranking" render={ () => <Ranking /> } />
        <Route path="/feedback" render={ () => <Feedback /> } />
        <Route path="/settings" render={ (props) => <Settings { ...props } /> } />
        <Route path="/game" render={ (props) => <Game { ...props } /> } />
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      </Switch>
    </div>
  );
}
