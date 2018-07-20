import ajaxRest from './ajaxBase'

function loginWithPwd (param) {
  let p = new Promise((resolve, reject) => {
    let params = {
      url: `/login`,
      method: 'POST',
      data: param,
      timeout: {client: 10 * 1000}
    }

    ajaxRest(params).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  return p
}

function refreshToken (param) {
  let p = new Promise((resolve, reject) => {
    let params = {
      url: `/login/refresh`,
      method: 'POST',
      data: param,
      timeout: {client: 10 * 1000}
    }

    ajaxRest(params).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  return p
}
export default {loginWithPwd, refreshToken}
