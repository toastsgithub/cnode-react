import React, { Component } from 'react'
import marked from 'marked'
import { Card, Avatar } from 'antd'
import style from './Comment.styl'
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
      <div className={ style['layout'] }>
        <Avatar shape="square" size="large" icon="user" src={ cmt.author.avatar_url } className={ style['comment-avatar'] }/>
        <Card title={ cmt.author.loginname } className={ style['comment'] }>
          <div className={ style['caret'] }/>
          <div dangerouslySetInnerHTML={{ __html: marked(cmt.content) }}></div>
        </Card>
      </div>
    )
  }
}