import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, List, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import style from './style.styl'

class Profile extends Component {
  constructor(props){
    super(props)
  }

  render () {
    const { user } = this.props
    const data = [{ title: 'mocktitle' }]
    return (
      <div className={ style['layout'] }>
        <div className={ style['wrapper'] }>
          <Card title='最近回复的帖子'>
            <List dataSource={ user.recent_replies }
                  renderItem={(reply)=>(
                    <List.Item>
                      <List.Item.Meta avatar={<Avatar src={reply.author.avatar_url}/>}
                                      title={ <Link to={ `/post/${ reply.id }` }>{ reply.title }</Link> }
                                      description={ `by - ${reply.author.loginname}` }/>
                    </List.Item>
                  )}>

            </List>
          </Card>
          <Card title='最近发布的主题' style={{ marginTop: '20px' }}>
          <List dataSource={ user.recent_topics }
                renderItem={(reply)=>(
                  <List.Item>
                    <List.Item.Meta avatar={<Avatar src={reply.author.avatar_url}/>}
                                    title={ <Link to={ `/post/${ reply.id }` }>{ reply.title }</Link> }
                                    description={ `by - ${reply.author.loginname}` }/>
                  </List.Item>
                  )}>

            </List>
          </Card>

          <Card title='我的消息' style={{ marginTop: '20px' }}>
            Message
          </Card>
        </div>
      </div>)
  }
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null) (Profile)