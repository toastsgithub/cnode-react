import React, { Component, Fragment } from 'react'
import IconButton from '@/component/IconButton.jsx'
import { Card, Avatar, Icon, Tooltip, message, Button, Select } from 'antd'
import { COMMENT_SENDING, COMMENT_SUCCESS, COMMENT_FAILED } from './commentStatus.js'
import MarkdownEditor from '@/component/MarkdownEditor.jsx'
const { Option, OptGroup } = Select
import { submitComment } from './actions.js'
import { connect } from 'react-redux'


class CommentEditor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mdValue: '',
      replyTo: null, // 回复的人的 id ，如果是对帖子本身回复，不需要带此参数
    }
  }

  handleMdValueChange (value) {
    this.setState({ mdValue: value })
  }

  handleReplyToChange  = (value) => {
    this.setState({ replyTo: value })
  }

  componentWillReceiveProps (nextProps) {
    
  }

  render() {
    const { user, mentionedGroup, topicId, commentStatus, submitComment } = this.props
    if ( commentStatus.status === COMMENT_SUCCESS) {
      message.success('评论成功')
      location.reload()
      return
    }
    console.log(commentStatus)
    const mentionedAvailable = mentionedGroup.map(({ username, avatar, id })=>{
      return <Option value={ id }><Avatar src={avatar} size='small'/>{ username }</Option>
    })
    const EditorElem = user.loggedIn ? 
                      <Fragment>
                        <MarkdownEditor value={ this.state.mdValue } onChange={ this.handleMdValueChange.bind(this) }/>
                        <Select showSearch
                                size='large'
                                style={{ width: '300px', display: 'block', marginTop: '10px' }}
                                onChange={ this.handleReplyToChange }
                                defaultValue={null}
                                filterOption={(input, option) => { console.log(option.props.children);return option.props.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0}}>
                          <OptGroup label='默认'>
                            <Option value={null}>直接回复本帖</Option>
                          </OptGroup>
                          <OptGroup label='回复本帖中出现的人'>
                            { mentionedAvailable }
                          </OptGroup>
                        </Select>
                        <Button style={{ marginTop: '10px', display: 'block' }} onClick={ submitComment.bind(this, topicId, this.state.mdValue.text, this.state.replyTo, user.accesstoken) }>发布评论</Button>
                      </Fragment>
                      :
                      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <p>登录来发表评论</p>
                        <IconButton type='lock' size='40px'/>
                      </div>
    
    
    return (
      <Card style={{ position: 'relative', marginTop: '10px' }}>
        { EditorElem }
      </Card>)
  }
}

function mapStateToProps (state) {
  return {
    user: state.user,
    commentStatus: state.commentStatus
  }
}

function mapDispatchToProps (dispatch) {
  return {
    submitComment: (topicId, content, reply_id, accesstoken)=>{
      dispatch(submitComment(topicId, content, reply_id, accesstoken))
    }
  }
}


export default connect (mapStateToProps, mapDispatchToProps) (CommentEditor)