import React, { Component } from 'react'
import { Layout, Menu, Icon, Button, Avatar, Badge, Card, Popover, List } from 'antd'
import style from './Homepage.styl'
import Request from 'superagent'
import Post from '../component/Post.jsx'
import { html2text } from '../util.js'
import EventProxy from '../common/EventProxy.js'

const { Header, Content, Footer } = Layout

export default class Homepage extends Component{
  constructor(props){
    super(props)
    this.state = {
      postList: []
    }
  }
  componentWillReceiveProps(nextProps){
    this.requestTopics(nextProps.match.params.type)
  }
  componentWillMount(){
    EventProxy.on('switch-tab', (tabName)=>{
      console.log('going to switch')
      this.requestTopics(tabName)
    })
    this.requestTopics(this.props.match.params.type)
  }
  requestTopics(tabName){
    const checkTable = ['ask', 'share', 'job', 'good', 'all', 'dev']
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
          title: cur.title,
          avatar: cur.author.avatar_url,
          author: cur.author.loginname,
          content: html2text(cur.content).substring(0, 200),
        })
      })
      this.setState({ postList: posts })
    })
  }
  render() {
    const posts = this.state.postList.map((cur)=>{
      return <Post title={ cur.title }
                   avatar={ cur.avatar }
                   author={ cur.author }
                   content={ cur.content }
                   href={ cur.href }/>
    })
    return (
      <div className={ style['layout'] }>
        <Content className={ style['content'] }>
          <div style={{ width: '100%', maxWidth: '1214px', display: 'flex' }}>
            <div className={ style['posts-column'] }>
              {/* <Skelecton /> */}
              { posts }
            </div>
            <div className={ style['info-column'] }>
              <Card className={ style['info-card'] }>
                Information
              </Card>
            </div>
          </div>
        </Content>
      </div>
    )
  }
}

