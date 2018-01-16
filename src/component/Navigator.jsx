import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Icon, Button, Avatar, Badge, Card, Popover, List } from 'antd'
import style from './Navigator.styl'
import NavLink from '../component/NavLink.jsx'
import EventProxy from '../common/EventProxy.js'
const { Header, Content, Footer } = Layout

class Navigator extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentTab: ""
    }
  }
  componentDidMount(){
    EventProxy.on('navigator:switchTab', (tabName)=>{
      this.setState({ currentTab: tabName })
    })
  }
  jump(path){
    this.props.history.push(path)
  }
  isSelectedTab(targetTabName){
    const ret = targetTabName === this.state.currentTab ? 'nav-btn-selected' : ''
    return ret
  }
  render(){
    return (
    <Header className={ style['nav-header'] }>
      <div className={ style['nav-wrapper'] }>
        <img src="/cnodejs_dark.svg" height='30px'style={{ marginBottom: '10px', cursor: 'pointer' }} onClick={ this.jump.bind(this, '/') }/>
        <div className={ style['nav-right-box'] }>
          <NavLink href='/topics/all' className={ `${style['nav-btn']} ${this.isSelectedTab('all')}` }>首页</NavLink>
          <NavLink href='/topics/good' className={ `${style['nav-btn']} ${this.isSelectedTab('good')}` }>精华</NavLink>
          <NavLink href='/topics/share' className={ `${style['nav-btn']} ${this.isSelectedTab('share')}` }>分享</NavLink>
          <NavLink href='/topics/ask' className={ `${style['nav-btn']} ${this.isSelectedTab('ask')}` }>问答</NavLink>
          <NavLink href='/topics/job' className={ `${style['nav-btn']} ${this.isSelectedTab('job')}` }>招聘</NavLink>
          <NavLink href='/topics/dev' className={ `${style['nav-btn']} ${this.isSelectedTab('dev')}` }>测试</NavLink>
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