import React, { Component } from 'react'
import { Card } from 'antd'
import commonStyle from '../common/CommonComponentStyle.styl'

export default class Skelecton extends Component{

  render(){
    // 显示的文章块骨架的数量，默认 3
    const skelectonAmount = this.props.amount || 3
    const skelectonElems  = new Array(skelectonAmount)
    .fill(<Card loading={true} className={ commonStyle['round-cornor-card'] }>  </Card>)
    return (
      <div>
        { skelectonElems }
      </div>
    )
  }
}