import React, { Component } from 'react'
import { LOCAL_STORAGE_ACCESSTOKEN } from '@/constant.js'

import { login } from './actions.js'
import { connect } from 'react-redux'
import style from './LoginPage.styl'
import { Card, Input, Button, message } from 'antd'
import request from 'superagent'
message.config({ top: '55px' })

class LoginPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      accessToken: ''
    }
    this.onAccessTokenChange = this.onAccessTokenChange.bind(this)
  }

  onAccessTokenChange(e, val) {
    this.setState({
      accessToken: e.target.value
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.user.loggedIn) {
      message.success('登录成功')
      this.props.history.push('/')
      localStorage.setItem(LOCAL_STORAGE_ACCESSTOKEN, nextProps.user.accesstoken)
    }
  }

  render(){
    return (
      <div className={ style['layout'] }>
        <Card className={ style['login-frame'] }>
          <img src="/verify.svg" alt="verify" width='100%'/>
          <Input onChange={this.onAccessTokenChange}
                 onPressEnter={this.onLogin}
                 placeholder="Access Token"/>
          <Button style={{ width: '100%', marginTop: '10px' }} onClick={this.props.onLogin.bind(this, this.state.accessToken)} >Login</Button>
        </Card>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return { user: state.user }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    onLogin: (accesstoken)=>{
      dispatch(login(accesstoken))
    }
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (LoginPage)