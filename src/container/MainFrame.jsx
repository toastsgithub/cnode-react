import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Homepage from './Homepage.jsx'
import NewPostPage from './NewPostPage.jsx'
import Navigator from '../component/Navigator.jsx'
import PostContentPage from '../container/PostContentPage.jsx'
import LoginPage from '../container/LoginPage.jsx'

export default class MainFrame extends Component {
  render (){
    return (
      <div>
        <Navigator />
        <Switch>
          <Route exact path='/' component={ Homepage }></Route>
          <Route path='/topics/:type' component={ Homepage }></Route>
          <Route path='/post/new' component={ NewPostPage }></Route>
          <Route path='/post/:postId' component={ PostContentPage }></Route>
          <Route path='/login' component={ LoginPage }></Route>
        </Switch>
      </div>
    )
  }
}