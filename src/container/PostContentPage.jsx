import React, { Component, Fragment } from 'react'
import { Card, Avatar, Icon } from 'antd'
import style from './PostContentPage.styl'
import Request from 'superagent'
import Comment from '../component/Comment.jsx'
import marked from 'marked'
marked.setOptions({
  gfm: true,
  breaks: true
})

export default class PostContentPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      postContent: '',
      comments: [],
      author: {},
      title: '',
      loadingContent: true,
      loadingComment: false
    }
  }
  componentDidMount(){
    this.setState({ loadingContent: true })
    const postId = this.props.match.params.postId
    Request.get(`/api/topic/${postId}`)
    .query({ mdrender: false })
    .end((err, res)=>{
      this.renderContent(res.body.data.content)
      let author = res.body.data.author
      author.id = res.body.data.author_id
      this.setState({ 
        comments: res.body.data.replies,
        author: author,
        title: res.body.data.title,
        collected: res.body.data.collected
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
                     author={this.state.author}
                     replyCount={this.state.comments.length}
                     collected={this.state.collected} />
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
    <div style={{ flex: 1, minWidth: '0' }}>
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
          <Card loading={ loadingContent } className={ style['content-body'] }>
            {/* FYI. 这里 Card 中如果没有内容的话, loading 效果不显示, 至少留个空白或者显式的留个 字符/回车 等 */}
                
            <div>
              <div dangerouslySetInnerHTML={{ __html: postContent }} />
            </div>
          </Card>
        </div>
        <span style={{ fontSize: '20px' }}>评论</span>
        <hr/>
        <CommentList comments={comments}>
          { (comments) => comments.map((commentItem)=> <Comment comment={commentItem}/> ) }
        </CommentList>
      </div>)
}

function RightPart (props) {
  const { title, author, replyCount } = props
  return (
  <div className={ style['post-info'] }>
    <Card style={{position: 'sticky', top: '10px'}}>
      <h2 style={{ border: 'none' }}>{ title }</h2>
      <hr/>
      <tr><td>作者：</td><td>{author.loginname}</td></tr>
      <tr><td>回复数：</td><td>{replyCount}</td></tr>
      <hr/>
      <div style={{ display: 'flex' }} className={ style['post-menu'] }>
        <Icon type="folder-add" />
      </div>
      {/* <Avatar icon='user' style={{ width: '100%' }} src={author.avatar_url}/> */}
    </Card>
  </div>)
}

function CommentList (props) {
  return (
    <div>
      { props.children(props.comments) }
    </div>)
}