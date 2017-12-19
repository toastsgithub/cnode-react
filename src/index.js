import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Homepage from './container/Homepage.jsx'
import MainFrame from './container/MainFrame.jsx'
import registerServiceWorker from './registerServiceWorker'
ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route path='/' component={ MainFrame } />
      {/* <Route path='/home' component={ Homepage }/> */}
    </Switch>
  </BrowserRouter>
), document.getElementById('root'))
registerServiceWorker()
