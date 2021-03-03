import React, { Component, Fragment } from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Link
 } from 'react-router-dom'

import Login from './comps/Login'
import Regis from './comps/Regis'
import Home from './comps/Home'
import Searcher from './comps/Searcher'
import Profile from './comps/Profile'

class App extends Component {
  render(){
    return (
      <Router>
        <h1 className='bg-dark px-4 py-2'><Link to='/'><div style={{
          display: 'inline',
        }}className='text-light font-weight-bold'>post</div><div style={{
          display: 'inline',
        }}className='text-info font-weight-bold'>ER!</div></Link></h1>
        <Route path='/' exact>
          <Login/>
        </Route>
        <Route path='/register'>
          <Regis/>
        </Route>
        <Route path='/home'>
          <Home/>
        </Route>
        <Route path='/search'>
          <Searcher/>
        </Route>
        <Route path="/profile/:user" component={Profile}/>
      </Router>
    );
  }
}

export default App;
