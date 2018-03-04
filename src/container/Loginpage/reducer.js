import { LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from './actionType.js'

export default (state={ loggedIn: false }, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return { ...state, loggedIn: true,  ...action.user }
    }

    case LOGIN_FAILED: {
      return { ...state, ...action.error }
    }

    case LOGOUT: {
      return { loggedIn: false }
    }

    default: {
      return state
    }
  }
}