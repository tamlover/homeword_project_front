import ajaxRest from './ajaxBase'

const CONTROLLER_PREFIX = '/main/User'

function getUsers () {
  let p = new Promise((resolve, reject) => {
    let params = {
      url: `/${CONTROLLER_PREFIX}/`,
      method: 'GET',
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

function addUser (param) {
  let p = new Promise((resolve, reject) => {
    let params = {
      url: `/${CONTROLLER_PREFIX}/`,
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

export default {getUsers, addUser}
