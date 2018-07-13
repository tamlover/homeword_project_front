import ajaxRest from './ajaxBase'

const CONTROLLER_PREFIX = 'device'

function getDeviceList (param) {
  let p = new Promise((resolve, reject) => {
    let params = {
      url: `/${CONTROLLER_PREFIX}/userId/${param}`,
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
      url: `/${CONTROLLER_PREFIX}/${param}`,
      method: 'DELETE',
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

function updateDevice (param) {
  let p = new Promise((resolve, reject) => {
    let params = {
      url: `/${CONTROLLER_PREFIX}`,
      method: 'PUT',
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

export default {getDeviceList, addDevice, deleteDevice, updateDevice}
