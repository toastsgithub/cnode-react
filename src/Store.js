import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import reduxThunkMiddleware from 'redux-thunk'
import devToolsEnhancer from 'remote-redux-devtools'
import { reducer as HomepageReducer } from '@/container/Homepage'
import { reducer as LoginpageReducer } from '@/container/Loginpage'
import { reducer as CommentEditorReducer } from '@/component/CommentEditor'

const reducers = combineReducers({
  user: LoginpageReducer,
  commentStatus: CommentEditorReducer
})

export default createStore(reducers, compose(applyMiddleware(reduxThunkMiddleware), devToolsEnhancer()))