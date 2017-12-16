import React, { Component } from 'react'
import { Layout, Menu, Icon, Button, Avatar, Badge, Card, Popover, List } from 'antd'
import style from './Homepage.css'
const { Header, Content, Footer } = Layout

export default class Homepage extends Component{

  render() {
    return (
      <Layout>
        <Header style={{ paddingLeft: '15px' }}>
          <img src="/cnodejs_light.svg" height='30px'style={{ marginBottom: '10px' }}/>
          <Button ghost className={style['nav-btn']}>首页</Button>
          <Button ghost className={style['nav-btn']}>首页</Button>
          <Button ghost className={style['nav-btn']}>首页</Button>
          <Button ghost className={style['nav-btn']}>首页</Button>
        </Header>
      </Layout>
    )
  }
}