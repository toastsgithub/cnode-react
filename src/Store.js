import { createStore, combineReducers, applyMiddleware } from 'redux'
import reduxThunkMiddleware from 'redux-thunk'
import { reducer as HomepageReducer } from '@/container/Homepage'
import { reducer as LoginpageReducer } from '@/container/Loginpage'
const reducers = combineReducers({
  user: LoginpageReducer,
  // currentTab: Home
})

export default createStore(reducers, applyMiddleware(reduxThunkMiddleware))