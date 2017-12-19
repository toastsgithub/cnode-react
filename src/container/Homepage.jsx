import React, { Component } from 'react'
import { Layout, Menu, Icon, Button, Avatar, Badge, Card, Popover, List } from 'antd'
import style from './Homepage.styl'
import Request from 'superagent'
import Post from '../component/Post.jsx'
import Skelecton from './Skelecton.jsx'
import { html2text } from '../util.js'

const { Header, Content, Footer } = Layout

export default class Homepage extends Component{
  constructor(props){
    super(props)
    this.state = {
      postList: []
    }
  }
  componentWillMount(){
    // const data = []
    // for (let i = 0; i < 5; i++) {
    //   data.push({
    //     href: 'http://ant.design',
    //     title: `ant design part ${i}`,
    //     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    //     description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    //     content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    //   })
    // }
    // this.setState({ postList: data })

    Request.get('/api/topics')
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
        <Header className={ style['nav-header'] }>
          <div className={ style['nav-wrapper'] }>
            <img src="/cnodejs_light.svg" height='30px'style={{ marginBottom: '10px' }}/>
            <div className={ style['nav-right-box'] }>
              <Button ghost className={ style['nav-btn'] }>首页</Button>
              <Popover overlayStyle={{ zIndex: 100001 }}
                       placement="bottomRight" 
                       title={<InfoTitle username={'Toast'} />} content={'退出登录'} 
                       trigger="click">
                <Avatar className={ style['nav-avatar'] } icon="user" />
              </Popover>
              
            </div>
          </div>
        </Header>
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

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
)

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
  