import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Homepage from './Homepage.jsx'
import Navigator from '../component/Navigator.jsx'
import PostContentPage from '../container/PostContentPage.jsx'

export default class MainFrame extends Component {
  render (){
    return (
      <div>
        <Navigator />
        <Switch>
          <Route exact path='/' component={ Homepage }></Route>
          <Route path='/topics/:type' component={ Homepage }></Route>
          <Route path='/post/:postId' component={ PostContentPage }></Route>
        </Switch>
      </div>
    )
  }
}