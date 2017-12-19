import React, { Component } from 'react'
import { Card } from 'antd'
import commonStyle from '../common/CommonComponentStyle.styl'

export default class Skelecton extends Component{

  render(){
    return (
      <Card loading={true} className={ commonStyle['round-cornor-card'] }>
        {/* aa */}
      </Card>
    )
  }
}