import { SUBMIT_COMMENT, SUBMIT_COMMENT_SUCCESS, SUBMIT_COMMENT_FAILED } from './actionType.js'
import { COMMENT_SENDING, COMMENT_SUCCESS, COMMENT_FAILED } from './commentStatus.js'

export default (state={ status: COMMENT_SENDING }, action) => {
  switch (action.type) {
    case SUBMIT_COMMENT_SUCCESS: {
      return { status: COMMENT_SUCCESS }
    }

    case SUBMIT_COMMENT_FAILED: {
      return { status: COMMENT_FAILED, msg: action.error }
    }

    default: {
      return status
    }
  }
}