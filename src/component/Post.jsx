import React ,{ Component } from 'react'
import { Card, Avatar } from 'antd'
import { withRouter } from 'react-router-dom'
import style from './Post.styl'
class Post extends Component {
  constructor(props){
    super(props)
  }
  jump(postId){
    this.props.history.push(`/post/${postId}`)
  }
  render(){
    return (
      <Card className={ style['post-card'] }>
        <div>
          <Avatar src={ this.props.avatar } icon='user'/>
          <span className={ style['post-author'] }>{ this.props.author }</span>
        </div>
        <h2 onClick={ this.jump.bind(this, this.props.id)}
            className={ style['post-title'] }>
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

export default withRouter(Post)