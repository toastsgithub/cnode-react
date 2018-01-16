import React, { Component } from 'react'
import style from './NavLink.styl'

export default class NavLink extends Component{

  render(){
    return (
      <a href={ this.props.href } className={ style['link'] }>
        { this.props.children }
      </a>
    )
  }
}