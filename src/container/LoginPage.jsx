import React, { Component } from 'react'
import style from './LoginPage.styl'
import { Card, Input, Button, message } from 'antd'
import request from 'superagent'
message.config({ top: '55px' })

export default class LoginPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      accessToken: ''
    }
    this.onAccessTokenChange = this.onAccessTokenChange.bind(this)
    this.onLogin = this.onLogin.bind(this)
  }
  onLogin () {
    request
      .post('https://cnodejs.org/api/v1/accesstoken')
      .send({ accesstoken: this.state.accessToken })
      .end((err, res)=>{
        if (err){
          message.error('Error')      
        } else if (!res.body.success){
          message.error(res.body.error_msg)
        } else {
          message.success('登录成功')
          const { loginname, avatar_url, id } = res.body
          localStorage.setItem('cnodejs:accesstoken', this.state.accessToken)
          localStorage.setItem('cnodejs:loginname', loginname)
          localStorage.setItem('cnodejs:avatar_url', avatar_url)
          localStorage.setItem('cnodejs:id', id)
          this.props.history.push('/')
        }
      })
  }
  onAccessTokenChange(e, val) {
    this.setState({
      accessToken: e.target.value
    })
  }
  render(){
    return (
      <div className={ style['layout'] }>
        <Card className={ style['login-frame'] }>
          <img src="/verify.svg" alt="verify" width='100%'/>
          <Input onChange={this.onAccessTokenChange}
                 onPressEnter={this.onLogin}
                 placeholder="Access Token"/>
          <Button style={{ width: '100%', marginTop: '10px' }} onClick={this.onLogin} >Login</Button>
        </Card>
      </div>
    )
  }
}