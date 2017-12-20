import React ,{ Component } from 'react'
import { Card, Avatar, Tag, Icon, Tooltip } from 'antd'
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
        <div className={ style['post-info-wrapper'] }>
          <div>
            <Avatar src={ this.props.avatar } icon='user' className={ style['post-avatar'] }/>
            <div className={ style['post-author'] }>
              <div>
                { this.props.author }
              </div>
            </div>
          </div>
          <div className={ style['post-info-right-part'] }>
            <Tag color="blue">{ this.props.postType }</Tag>
          </div>
        </div>
        <div onClick={ this.jump.bind(this, this.props.id)}
            className={ style['post-title'] }>
          { this.props.title }
        </div>
        <hr/>
        <div className={ style['post-content'] }>
          { this.props.content }
        </div>
        ...
        <strong>READ MORE</strong>
        <div className={ style['post-footer'] }>
          <div>
            <Tooltip placement="bottom" title="查看/回复">
              <Icon type="eye" />
              1000/16
            </Tooltip>
          </div>
          <div>
            <Tooltip placement="bottom" title="创建时间">
              <Icon type="rocket" />
              2017-12-20
            </Tooltip>
          </div>
          <div>
            <Tooltip placement="bottom" title="最后回复时间">
              <Icon type="form" />
              { ~~(Math.random()*100) } min
            </Tooltip>
          </div>
        </div>
      </Card>)
  }
}

export default withRouter(Post)