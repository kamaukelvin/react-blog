import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './pages/Home'
import Post from './pages/Post';

function App() {
  return (
    <div className="App">
      <Router>
     <Navbar />
     <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/posts/:postId" exact component={Post}/>
     </Switch>
    
     </Router>
    </div>
  );
}

export default App;
