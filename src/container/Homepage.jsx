import React, { Component } from 'react'
import { Layout, Menu, Icon, Button, Avatar, Badge, Card, Tooltip, List } from 'antd'
import style from './Homepage.styl'
import Request from 'superagent'
import Post from '../component/Post.jsx'
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
      currentTopic: '首页'
    }
  }
  componentWillReceiveProps(nextProps){
    const tabName = nextProps.match.params.type
    this.requestTopics(tabName)
  }
  componentWillMount(){
    this.requestTopics(this.props.match.params.type)
  }
  mapTopicName(tabName){
    return topicNameTable[checkTable.indexOf(tabName)]
  }
  requestTopics(tabName){
    if (checkTable.indexOf(tabName) === -1){
      throw new Error(`tabName should be one of ${checkTable.join(', ')}`)
    }

    Request.get('/api/topics')
    .query({ tab: tabName })
    .end((err, res)=>{
      let posts = []
      res.body.data.forEach((cur)=>{
        posts.push({
          href: `https://cnodejs.org/topic/${cur.id}`,
          id: cur.id,
          title: cur.title,
          avatar: cur.author.avatar_url,
          author: cur.author.loginname,
          content: html2text(cur.content).substring(0, 200),
          tab: cur.tab
        })
      })
      this.setState({ 
        currentTopic: this.mapTopicName(tabName),
        postList: posts
      })
    })
  }
  render() {
    const posts = this.state.postList.map((cur)=>{
      return <Post title={ cur.title }
                   id={ cur.id }
                   avatar={ cur.avatar }
                   author={ cur.author }
                   content={ cur.content }
                   href={ cur.href }
                   postType={ this.mapTopicName(cur.tab) }/>
    })
    return (
      <div className={ style['layout'] }>
        <Content className={ style['content'] }>
          <div style={{ width: '100%', maxWidth: '1214px', display: 'flex' }}>
            <div className={ style['posts-column'] }>
              { posts }
            </div>
            <div className={ style['info-column'] }>
              <Card className={ style['info-card'] }>
              <Tooltip placement="left" title="当前板块">
                <div>
                  <Icon type="appstore-o" />
                  <span style={{ padding: '0 10px' }}>{ this.state.currentTopic }</span>
                </div>
              </Tooltip>
              </Card>
            </div>
          </div>
        </Content>
      </div>
    )
  }
}

