import axios from 'axios'
import Qs from 'qs'
import * as tokenPrc from '@/js/tokenProcess'
import {loginAPI} from '@/api/restfulAPI'

const DOMAIN_KEY = 'wise-paas'
const DEF_REST_PREFIX = '/my-project-end/api'
const REST_PREFIX = getRestPrefix()
const REST_BASEURL = getBaseURL()

axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.interceptors.response.use(response => {
  if (response.headers.token !== undefined) {
    // console.log('refresh token')
    tokenPrc.setToken(response.headers.token)
  }
  return response.data
}, error => {
  let errInfo = {}
  if (error.response != null) {
    errInfo = {
      data: error.response.data == null ? null : error.response.data,
      errCode: error.response.status
    }
    if (errInfo.errCode === 401) {
      console.log('go 401')
      window.location.href = '/#/login'
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
    }
  }
  return Promise.reject(errInfo)
})

axios.interceptors.request.use(config => {
  if (localStorage.getItem('token') !== null && localStorage.getItem('userId') !== null) {
    if (!(config.url === '/my-project-end/api/login' || config.url === '/my-project-end/api/login/refresh')) {
      let param = {}
      param['userId'] = localStorage.getItem('userId')
      loginAPI.refreshToken(param).then(data => {
      // console.log(config.url)
      }).catch(error => {
        console.log(error)
      })
    }
  }

  return config
})

function ajaxRest ({url, method, data = {},
  timeout = {server: 5000, client: 5000},
  pathPrefix = REST_PREFIX,
  responseType = 'json'}) {
  let p = new Promise((resolve, reject) => {
    let urlParams = {}
    let bodyData = {}
    if (method === 'GET') {
      urlParams = {_now: Date.now(), ...data}
    } else bodyData = data

    let config = {
      url: `${pathPrefix}${url}`,
      baseURL: REST_BASEURL,
      method: method,
      params: urlParams,
      paramsSerializer: function (params) {
        return Qs.stringify(params, {arrayFormat: 'repeat'})
      },
      data: bodyData,
      timeout: timeout.client,
      responseType: responseType
    }

    let token = localStorage.getItem('token')
    if (token != null) {
      config.headers = {
        'Authorization': token
      }
    }

    axios.request(config).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })

  return p
}

function getBaseURL () {
  let baseUrl = ''
  if (window.location.origin.search(DOMAIN_KEY) !== -1) {
    baseUrl = window.location.origin
  }
  return baseUrl
}

function getRestPrefix () {
  let prefix = '/api'
  if (window.location.origin.search(DOMAIN_KEY) === -1) {
    prefix = DEF_REST_PREFIX
  }
  return prefix
}

export default ajaxRest
