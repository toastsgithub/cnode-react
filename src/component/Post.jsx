import React ,{ Component } from 'react'
import { Card, Avatar, Tag, Icon, Tooltip } from 'antd'
import { withRouter } from 'react-router-dom'
import style from './Post.styl'
import moment from 'moment'
moment.locale('zh-cn')

class Post extends Component {
  constructor(props){
    super(props)
  }
  jump(postId){
    this.props.history.push(`/post/${postId}`)
  }
  render(){
    const topTag = this.props.isTop ? <Tag color="green">置顶</Tag> : null
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
            { topTag }
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
              { this.props.visitCount }/{ this.props.replyCount }
            </Tooltip>
          </div>
          <div>
            <Tooltip placement="bottom" title="创建时间">
              <Icon type="rocket" />
              { moment(this.props.createAt).format('YYYY-MM-DD') }
            </Tooltip>
          </div>
          <div>
            <Tooltip placement="bottom" title="最后回复时间">
              <Icon type="form" />
              { moment(this.props.lastReplyAt).fromNow() }
            </Tooltip>
          </div>
        </div>
      </Card>)
  }
}

export default withRouter(Post)