import React, { Component } from 'react'
import { Card } from 'antd'
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
      loadingContent: true,
      loadingComment: false
    }
  }
  componentDidMount(){
    console.log('on post, set state')
    sessionStorage.setItem('onPost', 'true')
   
    this.setState({ loadingContent: true })
    const postId = this.props.match.params.postId
    Request.get(`/api/topic/${postId}`)
    .query({ mdrender: false })
    .end((err, res)=>{
      this.renderContent(res.body.data.content)
      this.setState({ comments: res.body.data.replies })
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
    console.log(this.state.comments)
    return (
      <div className={ style['layout'] }>
        <div className={ style['content-wrapper'] }>
          <Card loading={ this.state.loadingContent } className={ style['post-sheet'] }>
          {/* FYI. 这里 Card 中如果没有内容的话, loading 效果不显示, 至少留个空白或者显式的留个字符/回车等 */}
            <div dangerouslySetInnerHTML={{ __html: this.state.postContent }} />
          </Card>
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