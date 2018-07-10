import ajaxRest from './ajaxBase'

const CONTROLLER_PREFIX = '/main/device'

function getDevices (param) {
  let p = new Promise((resolve, reject) => {
    let params = {
      url: `/${CONTROLLER_PREFIX}/${param}`,
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

function addDevice (param) {
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

function deleteDevice (param) {
  let p = new Promise((resolve, reject) => {
    let params = {
      url: `/${CONTROLLER_PREFIX}/`,
      method: 'DELETE',
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

export default {getDevices, addDevice, deleteDevice}
