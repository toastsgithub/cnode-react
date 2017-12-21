import React, { Component } from 'react'
import * as ReactMde from 'react-mde'
import 'react-mde/lib/styles/css/react-mde-all.css'
import style from './MarkdownEditor.styl'

export default class MarkdownEditor extends Component{
  constructor(props){
    super(props)

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
  render(){
    return(
      <div>
        <ReactMde.ReactMdeToolbar
          value={ this.props.value }
          commands={ ReactMde.ReactMdeCommands.getDefaultCommands() }
          onCommand={ this.handleCommand.bind(this) }/>

        <div className={ style['editor-wrapper'] }>
          <div className={ style['editor-text'] }>
            <ReactMde.ReactMdeTextArea
              textAreaProps={{ id: 'md-editor', className: style['editor-textarea'] }}
              value={ this.props.value }
              onChange={ this.props.onChange } style={{ outline: 'none' }}/>
          </div>
        
          <div className={ style['editor-preview'] }>
            <ReactMde.ReactMdePreview
              markdown={ this.props.value.text }
              showdownOptions={{tables: true}}/>
          </div>
        </div>
      </div>
    )
  }
}