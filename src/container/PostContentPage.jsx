import React, { Component } from 'react'
import { Card } from 'antd'
import style from './PostContentPage.styl'
import Request from 'superagent'
import marked from 'marked'

export default class PostContentPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      postContent: ''
    }
  }
  componentWillMount(){
    const postId = this.props.match.params.postId
    Request.get(`/api/topic/${postId}`)
    .query({ mdrender: false })
    .end((err, res)=>{
      this.renderContent(res.body.data.content)
    })
  }
  renderContent(mdRaw){
    const contentHtmlDom = marked(mdRaw)
    this.setState({ postContent:  contentHtmlDom})
  }
  render(){
    return (
      <div className={ style['layout'] }>
        <div className={ style['content-wrapper'] }>
          <Card className={ style['post-sheet'] }>
            <div dangerouslySetInnerHTML={{ __html: this.state.postContent }} />
          </Card>
        </div>
      </div>
    )
  }
}