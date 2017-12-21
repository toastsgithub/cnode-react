import React, { Component } from 'react'
import { Card, Button } from 'antd'
import Md from '../component/MarkdownEditor.jsx'
import style from './NewPostPage.styl'

export default class NewPostPage extends Component{
  constructor(props){
    super(props)
    this.state = {
      reactMdeValue: {text: '', selection: null},
      editorView: { preview: false, text: false }
    }
  }
  handleValueChange (value) {
    this.setState({ reactMdeValue: value });
  }
  togglePreview(){
    this.setState({ editorView: {
      preview: !this.state.editorView.preview,
      text: !this.state.editorView.text
    } })
  }
  
  render(){
    const previewBtnType = this.state.editorView.preview ? 'primary' : 'default'
    return (
      <div className={ style['layout'] }>
        <div className={ style['content-wrapper'] }>
          <Card className={ style['new-post-card'] }>
            <Button type={ previewBtnType } onClick={ this.togglePreview.bind(this) }>预览</Button>
              <Md value={ this.state.reactMdeValue }
                onChange={ this.handleValueChange.bind(this) }/>
          </Card>
        </div>
      </div>
    )
  }
}