import React, { Component } from 'react'
import { Card, Avatar } from 'antd'
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
    sessionStorage.setItem('onPost', 'true')
   
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
        title: res.body.data.title
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
    const commentsElems = this.state.comments.map((cur)=>{
      return <Comment comment={ cur } />
    })
    return (
      <div className={ style['layout'] }>
        <div className={ style['content-wrapper'] }>
          <div className={ style['post-sheet'] }>
            <div className={ style['content-header'] }>
              <div className={ style['header-title'] }>
                <h2 style={{ border: 'none' }}>{ this.state.title }</h2>
                <div>
                  <a href='#'>
                    {this.state.author.loginname}
                  </a>
                  发布于 1970-01-01 / 
                  最后由 <a href='#'>holder</a>
                  回复于 1970-01-01 / 
                  xxx 次阅读
                </div>
              </div>
              <div className={ style['header-avatar'] }>
                <Avatar src={ this.state.author.avatar_url } size='large'/>
              </div>
            </div>
            <Card loading={ this.state.loadingContent } className={ style['content-body'] }>
            {/* FYI. 这里 Card 中如果没有内容的话, loading 效果不显示, 至少留个空白或者显式的留个 字符/回车 等 */}
              
              <div>
                <div dangerouslySetInnerHTML={{ __html: this.state.postContent }} />
              </div>
            </Card>
          </div>
            <span style={{ fontSize: '20px' }}>评论</span>
            <hr/>
            <div className={ style['comment'] }>
              <div className={ style['timeline'] } />
              { commentsElems }
            </div>
        </div>
        {/* <div className={ style['comment-wrapper'] }>
          
        </div> */}
      </div>
    )
  }
}