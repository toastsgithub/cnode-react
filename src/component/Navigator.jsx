import React, { Component } from 'react'
import { LOCAL_STORAGE_ACCESSTOKEN } from '@/constant.js'
import { logout } from '@/container/Loginpage/actions.js'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Icon, Button, Avatar, Badge, Card, Popover, List } from 'antd'
import style from './Navigator.styl'
import NavLink from '../component/NavLink.jsx'
import EventProxy from '../common/EventProxy.js'
import IconButton from './IconButton.jsx'
const { Header, Content, Footer } = Layout

class Navigator extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentTab: "",
      // username: null
    }
    this.logout = this.logout.bind(this)
  }
  componentDidMount(){
    EventProxy.on('navigator:switchTab', (tabName)=>{
      this.setState({ currentTab: tabName })
    })
    // const token = localStorage.getItem('cnodejs:accesstoken')
    // if (token){
    //   this.setState({
    //     username: "toast"
    //   })
    // }
  }

  logout () {
    localStorage.removeItem(LOCAL_STORAGE_ACCESSTOKEN)
    this.props.logout()
  }
  jump(path){
    this.props.history.push(path)
  }
  isSelectedTab(targetTabName){
    const ret = targetTabName === this.state.currentTab ? 'nav-btn-selected' : ''
    return ret
  }
  render(){
    const { avatar_url, loginname } = this.props.user
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
          <UserInfoPanel username={ loginname } avatar_url={ avatar_url } onLogout={this.logout}/>
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
        <div style={{ padding: '0 15px 0 15px' }}>当前用户: </div>
        <div style={{ fontWeight: '100', padding: '0 15px 0 15px' }}>{ this.props.username }</div>
      </div>
    )
  }
}
class InfoActions extends Component {

  render(){    
    return (
      <div>
        <DropdownButton>设置</DropdownButton>
        <DropdownButton onClick={ this.props.onLogout }>退出登录</DropdownButton>
      </div>
    )
  }
}

class DropdownButton extends Component {
  render(){
    return (
      <Button style={{ width: '100%', border: 'none', textAlign: 'left'}} onClick={this.props.onClick}>{ this.props.children }</Button>
    )
  }
}

function UserInfoPanel (props) {
  const { username, onLogout, avatar_url } = props
  return username ? 
        <LoggedInPanel username={username} onLogout={onLogout} avatar_url={avatar_url}/> :
        <UnloggedInPanel />
}

class LoggedInPanel extends Component {
  render (){
    const { username, onLogout, avatar_url } = this.props
    return (<div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
              <div style={{ padding: '0 15px 0 15px' }}>
                <Badge count={23}>
                  <IconButton type="notification" />
                </Badge>
              </div>
              <Popover overlayStyle={{ zIndex: 100001 }}
                        placement="bottomRight"
                        title={<InfoTitle username={username} />} content={ <InfoActions onLogout={onLogout}/> } 
                        trigger="click">
                <Avatar className={ style['nav-avatar'] } icon="user" src={ avatar_url }/>
              </Popover>
            </div>)
  }
}

function UnloggedInPanel (props) {
  return (
    <NavLink href="/login" >登录</NavLink>
  )
}

function mapStateToProps (state, ownProps) {
  return {
    user: state.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    logout: () => {
      dispatch(logout())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (Navigator))
// export default Navigator