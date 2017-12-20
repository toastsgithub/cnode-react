import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Homepage from './container/Homepage.jsx'
import MainFrame from './container/MainFrame.jsx'
import registerServiceWorker from './registerServiceWorker'
ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/topics/all" component={ Homepage } />} />
      <Route path='/' component={ MainFrame } />
    </Switch>
  </BrowserRouter>
), document.getElementById('root'))
registerServiceWorker()
