import React from 'react'
import ReactDOM from 'react-dom'
import store from '@/Store.js'
import { Provider } from 'react-redux'
import '@/index.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Homepage from '@/container/Homepage/Homepage.jsx'
import MainFrame from '@/container/MainFrame.jsx'
import registerServiceWorker from '@/registerServiceWorker'


ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/topics/all" component={ Homepage } />} />
        <Route path='/' component={ MainFrame } />
      </Switch>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'))

registerServiceWorker()
