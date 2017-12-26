import React, { Component } from 'react'
import { Button } from 'antd'
import * as ReactMde from 'react-mde'
import 'react-mde/lib/styles/css/react-mde-all.css'
import style from './MarkdownEditor.styl'
const ButtonGroup = Button.Group

export default class MarkdownEditor extends Component{
  constructor(props){
    super(props)
    this.state = {
      showPreview: false
    }
  }
  handleCommand(command){
    let textArea = document.querySelector('#md-editor')
    var _a = this.props, text = _a.value.text, onChange = _a.onChange;
    var newValue = command.execute(text, ReactMde.ReactMdeSelectionHelper.getSelection(textArea));
    if (newValue instanceof Promise) {
        // newValue = yield newValue;
        console.log('promise')
    }
    // This is necessary because otherwise, when the value is reset, the scroll will jump to the end
    newValue.scrollTop = textArea.scrollTop;
    onChange(newValue);
  }
  togglePreview(){
    this.setState({ showPreview: !this.state.showPreview })
  }
  render(){
    const previewStyle = { display: (this.state.showPreview ? 'block' : 'none') }
    return(
      <div>
        <div className={ style['editor-wrapper'] }>
          <div className={ style['editor-text'] }>
            <ButtonGroup className={ style["directive-bar"] }>
              <Button>H1</Button>
              <Button>H2</Button>
              <Button>H2</Button>
              <Button><i className='fa fa-bold'/></Button>
              <Button><i className='fa fa-italic'/></Button>
              <Button><i className='fa fa-link'/></Button>
              <Button><i className='fa fa-quote-left'/></Button>
              <Button><i className='fa fa-picture-o'/></Button>
              <Button><i className='fa fa-code'/></Button>
              <Button onClick={ this.togglePreview.bind(this) }><i className={`fa ${ this.state.showPreview ? 'fa-eye-slash' : 'fa-eye'}`}/></Button>
            </ButtonGroup>
            <ReactMde.ReactMdeTextArea
              textAreaProps={{ id: 'md-editor', className: style['editor-textarea'] }}
              value={ this.props.value }
              onChange={ this.props.onChange } style={{ outline: 'none' }}/>
            <div style={{ marginTop: '10px' }}>
              <Button type='default'>发布</Button>
            </div>
          </div>
        
          <div className={ style['editor-preview'] } style={ previewStyle }>
            <ReactMde.ReactMdePreview
              helpVisible={false}
              markdown={ this.props.value.text }
              showdownOptions={{tables: true}}/>
          </div>
        </div>
      </div>
    )
  }
}