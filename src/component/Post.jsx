import React ,{ Component } from 'react'
import { Card, Avatar } from 'antd'
import style from './Post.styl'
export default class Post extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <Card className={ style['post-card'] }>
        <div>
          <Avatar src={ this.props.avatar } icon='user'/>
          <span className={ style['post-author'] }>{ this.props.author }</span>
        </div>
        <h2 href={ this.props.href }
            className={ style['post-title'] }
            onClick={()=>{ window.location.href=this.props.href }}>
          { this.props.title }
        </h2>
        <hr/>
        <div className={ style['post-content'] }>
          { this.props.content }
        </div>
        ...
        <strong>READ MORE</strong>
      </Card>)
  }
}