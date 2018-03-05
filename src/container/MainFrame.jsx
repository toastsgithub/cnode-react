import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { LOCAL_STORAGE_ACCESSTOKEN } from '@/constant.js'
import { login } from '@/container/Loginpage/actions.js'
import { view as Homepage } from '@/container/Homepage'
import NewPostPage from './NewPostPage.jsx'
import Navigator from '@/component/Navigator.jsx'
import { view as PostContentPage } from '@/container/PostContentPage'
import { view as LoginPage } from '@/container/Loginpage'
import { view as ProfilePage } from '@/container/ProfilePage'

class MainFrame extends Component {
  componentDidMount () {
    const { user } = this.props
    console.log('check user')
    console.log(user)
    if (!user.loggedIn){
      const token = localStorage.getItem(LOCAL_STORAGE_ACCESSTOKEN)
      if (token) {
        this.props.automaticallyLogin(token)
      }
    }
  }
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
          <Route path='/profile' component={ ProfilePage }></Route>
        </Switch>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    automaticallyLogin: (accesstoken)=>{
      dispatch(login(accesstoken))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (MainFrame)