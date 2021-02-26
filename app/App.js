import React, { Component, Fragment } from 'react';
import { 
  BrowserRouter as Router,
  Route
 } from 'react-router-dom'

import Login from './comps/Login'
import Regis from './comps/Regis'
import Home from './comps/Home'

class App extends Component {
  render(){
    return (
      <Router>
        <h1 className='bg-dark px-4 py-2'><div style={{
          display: 'inline',
        }}className='text-light font-weight-bold'>post</div><div style={{
          display: 'inline',
        }}className='text-primary font-weight-bold'>ER!</div></h1>
        <Route path='/' exact>
          <Login/>
        </Route>
        <Route path='/register'>
          <Regis/>
        </Route>
        <Route path='/home'>
          <Home/>
        </Route>
      </Router>
    );
  }
}

export default App;
