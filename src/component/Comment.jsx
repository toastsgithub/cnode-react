import React, { Component } from 'react'
import marked from 'marked'
import { Card, Avatar, Icon } from 'antd'
import style from './Comment.styl'
import moment from 'moment'
moment.locale('zh-cn')
marked.setOptions({
  gfm: true,
  breaks: true
})

export default class Comment extends Component{
  constructor(props){
    super(props)
  }

  render(){
    const cmt = this.props.comment
    return (
      
        <Card className={ style['comment'] }>
          <div className={ style['layout'] }>
            <Avatar shape="square" size="large" icon="user" src={ cmt.author.avatar_url } className={ style['comment-avatar'] }/>
            {/* <div className={ style['caret'] }/> */}
            <div className={ style['comment-content'] }>
              <div className={ style['comment-menu'] }>
                <div>
                  <strong style={{ fontSize: '13px' }}>{ cmt.author.loginname }</strong>
                       ·     
                  <span style={{ fontSize: '13px' }}>{ moment(cmt.create_at).fromNow() }</span>
                </div>
                <div className={ style['comment-menu-btn-group'] }>
                  <Icon type="heart" />
                  <Icon type="form" />
                </div>
              </div>
              <div dangerouslySetInnerHTML={{ __html: marked(cmt.content) }}></div>
            </div>
          </div>
        </Card>
      
    )
  }
}