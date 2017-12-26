import React, { Component } from 'react'
import { Card, Button, Input, Icon, Select } from 'antd'
import Md from '../component/MarkdownEditor.jsx'
import style from './NewPostPage.styl'
const ButtonGroup = Button.Group
const Option = Select.Option

export default class NewPostPage extends Component{
  constructor(props){
    super(props)
    this.state = {
      reactMdeValue: {text: '', selection: null},
      editorView: { preview: false, text: true }
    }
  }
  handleValueChange (value) {
    this.setState({ reactMdeValue: value });
  }
  togglePreview(){
    this.setState({ editorView: {
      preview: !this.state.editorView.preview,
      text: this.state.editorView.text
    } })
  }
  toggleText(){
    this.setState({ editorView: {
      preview: this.state.editorView.preview,
      text: !this.state.editorView.text
    } })
  }
  
  render(){
    const previewBtnType = this.state.editorView.preview ? 'primary' : 'default'
    const textBtnType = this.state.editorView.text ? 'primary' : 'default'
    return (
      <div className={ style['layout'] }>
        <div className={ style['content-wrapper'] }>
          <Card className={ style['new-post-card'] } bodyStyle={{ height: '100%' }}>
            <div style={{ display: 'flex' }}>
              <Input placeholder="标题字数不少于10" style={{ marginBottom: '5px', flex: '3' }}
                    prefix={<Icon type='bulb'/>}/>
              <Select defaultValue="ask" style={{ marginLeft: '10px', flex: '1' }}>
                <Option value="ask">问答</Option>
                <Option value="share">分享</Option>
                <Option value="job">招聘</Option>
                <Option value="dev">测试</Option>
              </Select>
            </div>
            <div className={ style['editor-wrapper'] }>
              <Md value={ this.state.reactMdeValue }
                onChange={ this.handleValueChange.bind(this) }/>
            </div>
          </Card>
        </div>
      </div>
    )
  }
}