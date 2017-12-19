import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Icon, Button, Avatar, Badge, Card, Popover, List } from 'antd'
import style from './Navigator.styl'
import EventProxy from '../common/EventProxy.js'
const { Header, Content, Footer } = Layout

class Navigator extends Component {
  componentWillMount(){
    console.log(this.props)
  }
  switchTab(tabName){
    EventProxy.trigger('switch-tab', tabName)
  }
  jump(path){
    this.props.history.push(path)
  }
  render(){

    return (
    <Header className={ style['nav-header'] }>
      <div className={ style['nav-wrapper'] }>
        <img src="/cnodejs_light.svg" height='30px'style={{ marginBottom: '10px' }}/>
        <div className={ style['nav-right-box'] }>
          <Button ghost className={ style['nav-btn'] } onClick={ this.jump.bind(this, '/topics/all') }>首页</Button>
          <Button ghost className={ style['nav-btn'] } onClick={ this.jump.bind(this, '/topics/good') }>精华</Button>
          <Button ghost className={ style['nav-btn'] } onClick={ this.jump.bind(this, '/topics/share') }>分享</Button>
          <Button ghost className={ style['nav-btn'] } onClick={ this.jump.bind(this, '/topics/ask') }>问答</Button>
          <Button ghost className={ style['nav-btn'] } onClick={ this.jump.bind(this, '/topics/job') }>招聘</Button>
          <Button ghost className={ style['nav-btn'] } onClick={ this.jump.bind(this, '/topics/dev') }>测试</Button>
          <Popover overlayStyle={{ zIndex: 100001 }}
                   placement="bottomRight" 
                   title={<InfoTitle username={'Toast'} />} content={ <InfoActions /> } 
                   trigger="click">
            <Avatar className={ style['nav-avatar'] } icon="user" />
          </Popover>        
        </div>
      </div>
    </Header>
    )
  }
}

class InfoTitle extends Component {
  render() {
    return (
      <div>
        <div>当前用户: </div>
        <div style={{ fontWeight: '100' }}>{ this.props.username }</div>
      </div>
    )
  }
}
class InfoActions extends Component {

  render(){
    return (
      <div>
        <DropdownButton>设置</DropdownButton>
        <DropdownButton>退出登录</DropdownButton>
      </div>
    )
  }
}

class DropdownButton extends Component {
  render(){
    return (
      <Button style={{ width: '100%', border: 'none'}}>{ this.props.children }</Button>
    )
  }
}

export default withRouter(Navigator)
// export default Navigator