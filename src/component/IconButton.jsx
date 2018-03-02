import React, { Component } from 'react'
import { Icon } from 'antd'
import style from './IconButton.styl'
import combine from 'classnames'

export default class IconButton extends Component{
  render () {
    const { type, circled, size, color, onClick, onMouseEnter, onMouseLeave } = this.props
    
    const classNames = {}
    const button_cls = style['button']
    const circle_cls = style['circled']
    classNames[button_cls] = true
    classNames[circle_cls] = circled
    
    const extraStyle = {}
    size && (extraStyle['fontSize'] = size)
    color && (extraStyle['color'] = color)
    return (
      <button className={ combine(classNames) }
              onClick={ onClick } 
              onMouseEnter={ onMouseEnter }
              onMouseLeave={ onMouseLeave }
              style={ extraStyle } >
        <Icon type={ type } />
      </button>
    )
  }
}