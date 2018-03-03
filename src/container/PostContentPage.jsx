import React, { Component, Fragment } from 'react'
import { Card, Avatar, Icon, Tooltip, message } from 'antd'
import style from './PostContentPage.styl'
import Request from 'superagent'
import Comment from '../component/Comment.jsx'
import IconButton from '../component/IconButton.jsx'
import marked from 'marked'
marked.setOptions({
  gfm: true,
  breaks: true
})

export default class PostContentPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      id: null,
      postContent: '',
      comments: [],
      author: {},
      title: '',
      isCollected: false,
      loadingContent: true,
      loadingComment: false
    }
    this.collect = this.collect.bind(this)
  }
  componentDidMount(){
    this.setState({ loadingContent: true })
    const postId = this.props.match.params.postId
    Request.get(`/api/topic/${postId}`)
    .query({ mdrender: false, accesstoken: localStorage.getItem('cnodejs:accesstoken') })
    .end((err, res)=>{
      const data = res.body.data
      this.renderContent(data.content)
      let author = data.author
      author.id = data.author_id
      this.setState({ 
        id: data.id,
        comments: data.replies,
        author: author,
        title: data.title,
        isCollected: data.is_collect
      })
    })
  }
  renderContent(mdRaw){
    const contentHtmlDom = marked(mdRaw)
    this.setState({
      postContent:  contentHtmlDom,
      loadingContent: false
    })
  }

  collect () {
    Request
      .post(`/api/topic_collect/collect`)
      .send({ accesstoken: localStorage.getItem('cnodejs:accesstoken'), topic_id: this.state.id })
      .end((err, res)=>{
        if (err) {
          message.error('请求失败')
          return
        }
        this.setState({ isCollected: true })
        message.success('收藏成功')
      })
  }
  render(){
    return (
      <div className={ style['layout'] }>
        <div className={ style['content-wrapper'] }>
          <LeftPart title={this.state.title} 
                    author={this.state.author} 
                    comments={this.state.comments}
                    postContent={this.state.postContent}
                    loadingContent={this.state.loadingContent}
                    loadingComment={this.state.loadingComment}/>
          <RightPart title={this.state.title}
                     isCollected={this.state.isCollected}
                     author={this.state.author}
                     replyCount={this.state.comments.length}
                     collected={this.state.collected} 
                     handleCollect={this.collect} />
        </div>
      </div>
    )
  }
}

function LeftPart (props) {
  const { title, author, loadingContent, loadingComment, postContent, comments } = props
  const commentsElems = comments.map((cur)=>{
    return <Comment comment={ cur } />
  })
  return (
    <div style={{ flex: 1, minWidth: '0', marginTop: '10px' }}>
      <div className={ style['post-sheet'] }>
        <div className={ style['content-header'] }>
          <div className={ style['header-title'] }>
            <h2 style={{ border: 'none' }}>{ title }</h2>
            <div>
              <a href='#'>
                { author.loginname }
              </a>
              发布于 1970-01-01 / 
              最后由 <a href='#'>holder</a>
              回复于 1970-01-01 / 
              xxx 次阅读
            </div>
            </div>
            <div className={ style['header-avatar'] }>
              <Avatar src={ author.avatar_url } size='large'/>
            </div>
          </div>
          <Card loading={ loadingContent } className={ style['content-body'] } bordered={false}>
            {/* FYI. 这里 Card 中如果没有内容的话, loading 效果不显示, 至少留个空白或者显式的留个 字符/回车 等 */}
                
            <div>
              <div dangerouslySetInnerHTML={{ __html: postContent }} />
            </div>
          </Card>
        </div>

        <CommentList comments={comments}>
          { (comments) => comments.map((commentItem)=> <Comment comment={commentItem}/> ) }
        </CommentList>
      </div>)
}

function RightPart (props) {
  const { title, author, replyCount, isCollected, handleCollect } = props
  const collectedColor = isCollected ? 'orange' : null
  const collectedTooltip = isCollected ? '已收藏' : '添加到收藏'
  return (
  <div className={ style['post-info'] }>
    <Card style={{position: 'sticky', top: '10px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)'}} bordered={false}>
      <h2 style={{ border: 'none' }}>{ title }</h2>
      <hr/>
      <p style={{ display: 'flex', justifyContent: 'center' }}><Avatar src={ author.avatar_url } style={{ width: '50%', height: '50%' }}/></p>
      {/* <table> */}
        <tr><td><strong>作者：</strong></td><td>{author.loginname}</td></tr>
        <tr><td><strong>回复数：</strong></td><td>{replyCount}</td></tr>
      {/* </table> */}
      <hr/>
      <div style={{ display: 'flex' }} className={ style['post-menu'] }>
        <Tooltip title={collectedTooltip}>
          <IconButton type="folder-add" color={collectedColor} onClick={handleCollect}/>
        </Tooltip>
      </div>
      {/* <Avatar icon='user' style={{ width: '100%' }} src={author.avatar_url}/> */}
    </Card>
  </div>)
}

function CommentList (props) {
  const noCommentTips = <div> 还没有评论，来评一发 </div>
  const checkIfHaveComment = props.comments.length !== 0 ? null : noCommentTips
  
  return (
    <div style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
      <div style={{ marginTop: '10px', borderBottom: 'solid 1px #eee', background: '#fafafa', padding: '10px' }}>
        <h2 style={{ border: 'none', marginBottom: '0' }}>评论</h2>
      </div>
      { checkIfHaveComment }
      { props.children(props.comments) }
    </div>)
}