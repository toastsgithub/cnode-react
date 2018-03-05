import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Icon, Button, Avatar, Badge, Card, Tooltip, List, Pagination } from 'antd'
import { Link } from 'react-router-dom'
import style from './Homepage.styl'
import Request from 'superagent'
import Skelecton from '@/container/Skelecton.jsx'
import Post from '@/component/Post.jsx'
import { view as PostContentPage } from '@/container/PostContentPage'
import IconButton from '@/component/IconButton.jsx'
import { html2text } from '@/util.js'
import EventProxy from '@/common/EventProxy.js'

const { Header, Content, Footer } = Layout
const checkTable =     ['ask', 'share', 'job', 'good', 'all', 'dev']
const topicNameTable = ['问答', '分享', '招聘', '精华', '首页', '测试']

class Homepage extends Component{
  constructor(props){
    super(props)
    this.state = {
      postList: [],
      isLoading: false,
      currentTopic: '首页',
      currentPage: 1,
      isLoggedin: false,
      userInfo: { userName: '##', githubName: '##', createDate: '1970-01-01', score: '##'}
    }
    this.onPageChange = this.onPageChange.bind(this)
  }

  componentWillReceiveProps(nextProps){
    const tabName = nextProps.match.params.type
    EventProxy.trigger('navigator:switchTab', tabName)
    this.requestTopics(tabName)
  }

  componentDidMount(){
    document.title = 'CNode - Node.js 专业中文社区 | React 实现'
    const tabName = this.props.match.params.type
    this.setState({ isLoggedin: !!localStorage.getItem('cnodejs:accesstoken') })
    EventProxy.trigger('navigator:switchTab', tabName)
    this.requestTopics(tabName, 1)
  }
  mapTopicName(tabName){
    return topicNameTable[checkTable.indexOf(tabName)]
  }
  requestTopics(tabName, page){
    this.setState({
      postList: [],
      isLoading: true,
    })
    if (checkTable.indexOf(tabName) === -1){
      throw new Error(`tabName should be one of ${checkTable.join(', ')}, but got :${tabName}`)
    }

    Request.get('/api/topics')
    .query({ tab: tabName, page: page, limit: 10 })
    .end((err, res)=>{
      let posts = []
      res.body.data.forEach((cur)=>{
        posts.push({
          href: `https://cnodejs.org/topic/${cur.id}`,
          id: cur.id,
          title: cur.title,
          avatar: cur.author.avatar_url,
          author: cur.author.loginname,
          replyCount: cur.reply_count,
          visitCount: cur.visit_count,
          createAt: cur.create_at,
          lastReplyAt: cur.last_reply_at,
          isTop : cur.top, // 该帖子是否被置顶
          content: html2text(cur.content).substring(0, 200),
          tab: cur.tab
        })
      })
      this.setState({ 
        currentTopic: this.mapTopicName(tabName),
        postList: posts,
        isLoading: false
      })
    })
  }
  jump(path){
    this.props.history.push(path)
  }
  onPageChange(page){
    const tabName = this.props.match.params.type
    this.setState({ currentPage: page })
    this.requestTopics(tabName, page)
  }
  render() {
    const SkelectonWrapper = this.state.isLoading ? <Skelecton /> : null
    const posts = this.state.postList.map((cur)=>{
      return <Post title={ cur.title }
                   id={ cur.id }
                   avatar={ cur.avatar }
                   author={ cur.author }
                   replyCount={ cur.replyCount }
                   visitCount={ cur.visitCount }
                   createAt={ cur.createAt }
                   lastReplyAt={ cur.lastReplyAt }
                   content={ cur.content }
                   href={ cur.href }
                   isTop={ cur.isTop }
                   postType={ this.mapTopicName(cur.tab) }/>
    })
    
    const { user } = this.props
    const { loggedIn, ...userInfo } = user
    return (
      <div className={ style['layout'] } id='scroll-body'>
        <Content className={ style['content'] }>
          <div style={{ width: '100%', maxWidth: '1214px', display: 'flex', paddingBottom: '20px' }}>
            <div className={ style['posts-column'] }>
              { SkelectonWrapper }
              { posts }
              <Pagination current={ this.state.currentPage } total={300} onChange={ this.onPageChange } />
            </div>
            <div className={ style['info-column'] }>
              <div style={{ position: "sticky", top: '15px' }}>
                <Card className={ style['info-card'] }>
                  <Tooltip placement="left" title="公告">
                  <div>
                    <Icon type="notification" />
                    <span style={{ padding: '0 10px' }}>公告</span>
                  </div>
                  </Tooltip>
                  <div>CNode 社区为国内最大最具影响力的 Node.js 开源技术社区，致力于 Node.js 的技术研究。CNode 社区由一批热爱 Node.js 技术的工程师发起，目前已经吸引了互联网各个公司的专业技术人员加入，我们非常欢迎更多对 Node.js 感兴趣的朋友。</div>
                </Card>
                <Card className={ style['info-card'] }>
                  {/* 当前板块 */}
                  <Tooltip placement="left" title="当前板块">
                    <div>
                      <Icon type="appstore-o" />
                      <span style={{ padding: '0 10px' }}>{ this.state.currentTopic }</span>
                    </div>
                  </Tooltip>
                </Card>
                <UserInfoCard loggedIn={ loggedIn }
                              userName={ userInfo.loginname }
                              githubName={ userInfo.githubUsername }
                              createDate={ userInfo.create_at }
                              score={ userInfo.score }
                              toNewPost={ this.jump.bind(this, '/post/new') }
                              toLogin={ this.jump.bind(this, '/login') }/>
              </div>
            </div>
          </div>
        </Content>
      </div>
    )
  }
}

function UserInfoCard (props) {
  // const token = localStorage.getItem('cnodejs:accesstoken')
  const { loggedIn, userName, githubName, createDate, score, toNewPost, toLogin } = props
  if (loggedIn){
    return (
      <Card className={ style['info-card'] }>
        <Icon type="appstore-o" />
        <span style={{ padding: '0 10px' }}>个人信息</span>
        <Tooltip title='用户名' placement='left'>
          <KeyValuePair icon={'smile-o'}>{ userName }</KeyValuePair>
        </Tooltip>
        <Tooltip title='github 账户' placement='left'>
          <KeyValuePair icon={'github'}>{ githubName }</KeyValuePair>
        </Tooltip>
        <Tooltip title='加入时间' placement='left'>
          <KeyValuePair icon={'rocket'}>{ createDate.match(/^\d{4}-\d{2}-\d{2}/)[0] }</KeyValuePair>
        </Tooltip>
        <Tooltip title='积分' placement='left'>
          <KeyValuePair icon={'pay-circle'}>{ score }</KeyValuePair>
        </Tooltip>
        {/* 发布新话题 */}
        <Button type='primary' className={ style['new-topic-btn'] } onClick={ toNewPost }>发布新话题</Button>
      </Card>
    )
  } else {
    return (
      <Card className={ style['info-card'] }>
        <p style={{ textAlign: 'center' }}>登录以解锁个人功能</p>
        <p style={{ display: 'flex', justifyContent: 'center' }}>
          <IconButton type="lock" size='40px' onClick={ toLogin }/>
        </p>
      </Card>
    )
  }
}

class KeyValuePair extends Component {
  constructor(props){
    super(props)
  }
  render(){
    const iconName = this.props.icon
    const { onMouseEnter, onMouseLeave } = this.props
    const MyIcon = iconName ? <Icon type={ iconName } style={{ marginRight: '10px' }}/> : null
    return(
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        { MyIcon }
        <span>{ this.props.children }</span>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    user: state.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    // automaticallyLogin: (accesstoken) => {
    //   dispatch(login(accesstoken))
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Homepage)