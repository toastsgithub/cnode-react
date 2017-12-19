import React, { Component } from 'react'
import { Card } from 'antd'
import style from './PostContentPage.styl'
import Request from 'superagent'
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
      this.setState({ postContent: res.body.data.content })
    })
  }
  render(){
    return (
      <div className={ style['layout'] }>
        <div className={ style['content-wrapper'] }>
          <Card className={ style['post-sheet'] }>
            { this.state.postContent }
          </Card>
        </div>
      </div>
    )
  }
}