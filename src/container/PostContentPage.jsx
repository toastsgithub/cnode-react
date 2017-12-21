import React, { Component } from 'react'
import { Card, Tree } from 'antd'
import style from './PostContentPage.styl'
import Request from 'superagent'
import marked from 'marked'
const TreeNode = Tree.TreeNode
marked.setOptions({
  gfm: true,
  breaks: true
})

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
          <Card className={ style['comment'] }>
            <span style={{ fontSize: '20px' }}>评论</span>
            <hr/>
            <Tree>
              <TreeNode title='Toast'>
                <TreeNode title='Someone'></TreeNode>
                <TreeNode title='Oh no'></TreeNode>
              </TreeNode>
            </Tree>
          </Card>
        </div>
        {/* <div className={ style['comment-wrapper'] }>
          
        </div> */}
      </div>
    )
  }
}