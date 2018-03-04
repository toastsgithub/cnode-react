import { HANDLE_LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from './actionType.js'
import request from 'superagent'

export const loginSuccess = (userInfo)=> ({
  type: LOGIN_SUCCESS,
  user: userInfo
})

export const loginFailed = (error) => {
  type: LOGIN_FAILED,
  error
}

// @TIPS 此处用圆括号包裹一个对象，表示箭头函数直接返回一个对象，省去 return 语句
// 如果直接返回一个函数，在 redux-thunk 的辅助下，表示该 action 是一个异步的操作, 会被拦截执行，而不是同步派发
export const login = (accesstoken)=> ((dispatch, getState)=>{
  new Promise ((resolve, reject)=>{
    request
    .post('/api/accesstoken')
    .send({ accesstoken: accesstoken })
    .end((err, res)=>{
      if (err) {
        reject({ code: 403, msg: 'Invalid AccessToken'})
        return
      }
      resolve({
        accesstoken: accesstoken,
        loginname: res.body.loginname,
        id: res.body.id
      })
    })
  }).then((user)=>{
    return new Promise((resolve, reject)=>{
      request
        .get(`/api/user/${user.loginname}`)
        .end((err, res)=>{
          if (err) {
            reject({ code: 404,  msg: 'Can not fetch the userinfo, try again.' })
            return 
          }
          let fullUserInfo = res.body.data
          fullUserInfo.id = user.id
          fullUserInfo.accesstoken = user.accesstoken
          resolve(fullUserInfo)
        })
    })
  }).then((user)=>{
    dispatch(loginSuccess(user))
  }).catch((err)=>{
    dispatch(loginFailed(err))
  })
})

export const logout = ()=>({
  type: LOGOUT
})