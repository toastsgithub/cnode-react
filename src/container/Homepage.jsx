import React, { Component } from 'react'
import { Layout, Menu, Icon, Button, Avatar, Badge, Card, Tooltip, List, Pagination } from 'antd'
import style from './Homepage.styl'
import Request from 'superagent'
import Skelecton from '../container/Skelecton.jsx'
import Post from '../component/Post.jsx'
import PostContentPage from '../container/PostContentPage.jsx'
import { html2text } from '../util.js'
import EventProxy from '../common/EventProxy.js'

const { Header, Content, Footer } = Layout
const checkTable =     ['ask', 'share', 'job', 'good', 'all', 'dev']
const topicNameTable = ['问答', '分享', '招聘', '精华', '首页', '测试']

export default class Homepage extends Component{
  constructor(props){
    super(props)
    this.state = {
      postList: [],
      isLoading: false,
      currentTopic: '首页',
      currentPage: 1,
      userInfo: { userName: 'Toast', githubName: 'toastsgithub', createDate: '2017-12-20 20:04:13', score: '3213'}
    }
    this.onPageChange = this.onPageChange.bind(this)
  }
  componentWillReceiveProps(nextProps){
    const tabName = nextProps.match.params.type
    EventProxy.trigger('navigator:switchTab', tabName)
    // sessionStorage.removeItem('@@scroll')
    this.requestTopics(tabName)
  }
  componentWillUpdate(){
    // const scrollBody = document.getElementById('scroll-body')
    // let scrollPosition = sessionStorage.getItem('@@scroll')
    // if (scrollPosition){
    //   // 异步保证内容加载完后才调整 scroll 历史
    //   setImmediate(function() {
    //     scrollBody.scrollTop = Number.parseInt(scrollPosition)
    //   })
    // }
  }
  componentDidMount(){
    const tabName = this.props.match.params.type
    EventProxy.trigger('navigator:switchTab', tabName)
    this.requestTopics(tabName, 1)
    // // 记录滚动位置的历史数据，方便回跳的时候恢复现场
    // const scrollBody = document.getElementById('scroll-body')
    // // 函数节流 ??
    // // TODOS 这里如果 react 复用 dom 的话，会造成重复添加监听事件
    // let counter = 0
    // scrollBody.addEventListener('scroll', ()=>{
    //   counter ++
    //   if (counter > 10){
    //     sessionStorage.setItem(`@@scroll`,`${scrollBody.scrollTop}`)
    //     counter = 0
    //   }
    // })
    
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
          isTop : cur.top,
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
                <Card className={ style['info-card'] }>
                  <Icon type="appstore-o" />
                  <span style={{ padding: '0 10px' }}>个人信息</span>
                  <KeyValuePair icon={'smile-o'}>{ this.state.userInfo.userName}</KeyValuePair>
                  <KeyValuePair icon={'github'}>{ this.state.userInfo.githubName}</KeyValuePair>
                  <KeyValuePair icon={'rocket'}>{ this.state.userInfo.createDate}</KeyValuePair>
                  <KeyValuePair icon={'pay-circle'}>{ this.state.userInfo.score}</KeyValuePair>
                  {/* 发布新话题 */}
                  <Button type='primary' className={ style['new-topic-btn'] } onClick={ this.jump.bind(this, '/post/new') }>发布新话题</Button>
                </Card>
              </div>
            </div>
          </div>
        </Content>
      </div>
    )
  }
}

class KeyValuePair extends Component {
  constructor(props){
    super(props)
  }
  render(){
    const iconName = this.props.icon
    const MyIcon = iconName ? <Icon type={ iconName } style={{ marginRight: '10px' }}/> : null
    return(
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
        { MyIcon }
        <span>{ this.props.children }</span>
      </div>
    )
  }
}

