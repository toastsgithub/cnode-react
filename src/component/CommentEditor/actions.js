import { SUBMIT_COMMENT, SUBMIT_COMMENT_SUCCESS, SUBMIT_COMMENT_FAILED } from './actionType.js'
import request from 'superagent'

export const submitCommentSuccess = () => ({
  type: SUBMIT_COMMENT_SUCCESS
})

export const submitCommentFailed = (error) => ({
  type: SUBMIT_COMMENT_FAILED,
  error
})

export const submitComment = (topicId, content, reply_id, accesstoken) => (dispatch) => {
  request
    .post(`/api/topic/${topicId}/replies`)
    .send({ accesstoken, content, reply_id })
    .end((err, res)=>{
      if (err) {
        dispatch(submitCommentFailed(err))
        return
      }
      dispatch(submitCommentSuccess())
    })
}