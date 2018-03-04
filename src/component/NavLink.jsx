import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import style from './NavLink.styl'

export default class NavLink extends Component{

  render(){
    return (
        <Link to={ this.props.href } className={ `${style['link']} ${this.props.className}` }>
          { this.props.children }
        </Link>
    )
  }
}