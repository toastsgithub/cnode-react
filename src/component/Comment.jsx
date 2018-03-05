import React, { Component } from 'react'
import marked from 'marked'
import { Card, Avatar, Icon, Tooltip, Button } from 'antd'
import style from './Comment.styl'
import moment from 'moment'
import IconButton from './IconButton.jsx'

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
    const { loggedIn } = this.props
    const uptedColor = cmt.is_uped ? '#F6633D' : null
    return (
      
        <Card className={ style['comment'] } style={{ borderRight: 'none', borderLeft: 'none', borderTop: 'none' }}>
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
                { (()=>{ 
                  if (loggedIn) return (
                    <div className={ style['comment-menu-btn-group'] }>
                      <Tooltip title={<div>赞 <span style={{ color: 'red' }}>❤</span></div>} onClick={()=>{console.log('LIKE')}}>
                        <IconButton type="heart" text={ cmt.ups.length } color={ uptedColor }/>
                      </Tooltip>
                      <Tooltip title='回复'>
                        <IconButton type="form" />
                      </Tooltip>
                    </div>)
                  else return null
                  }
                )()}
              </div>
              <div dangerouslySetInnerHTML={{ __html: marked(cmt.content) }}></div>
            </div>
          </div>
        </Card>
      
    )
  }
}