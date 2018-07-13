import ajaxRest from './ajaxBase'

const CONTROLLER_PREFIX = 'user'

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

function deleteUser (param) {
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

function updateUser (param) {
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

function deleteBinding (param) {
  let p = new Promise((resolve, reject) => {
    let params = {
      url: `/${CONTROLLER_PREFIX}/binding`,
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

function addBinding (param) {
  let p = new Promise((resolve, reject) => {
    let params = {
      url: `/${CONTROLLER_PREFIX}/binding`,
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

function changePassword (param) {
  let p = new Promise((resolve, reject) => {
    let params = {
      url: `/${CONTROLLER_PREFIX}/pwd`,
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

export default {getUsers, addUser, deleteUser, updateUser, deleteBinding, addBinding, changePassword}
