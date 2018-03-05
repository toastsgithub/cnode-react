import style from './DropdownButton.styl'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class DropdownButton extends Component {
  render(){
    const { useLink, to, children } = this.props
    const elem = useLink ? <Link to={ to } className={ style['dropdownBtn'] }>{ children }</Link> : <div className={ style['dropdownBtn'] } onClick={this.props.onClick}>{ children }</div>
    return elem
  }
}


export default DropdownButton