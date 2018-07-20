import {Base64} from 'js-base64'

export const TOKEN_STG_KEY = 'myToken'

export function rememberToken (token) {
  localStorage.setItem(TOKEN_STG_KEY, token)
}

export function getToken () {
  var strCookie = document.cookie
  var arrCookie = strCookie.split('; ')
  for (var i = 0; i < arrCookie.length; i++) {
    var arr = arrCookie[i].split('=')
    if (arr[0] === 'EIToken') {
      return arr[1]
    }
  }
  return null
}

export function setToken (token) {
  localStorage.setItem('token', 'Bearer ' + token)
}

export function setCookie (cname, cvalue, exdays) {
  var d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  var expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + '; ' + expires
}

export function clearToken () {
  console.log(getCookie('EIToken'))
  setCookie('EIToken', '', -1)
  setCookie('EIName', '', -1)
  setCookie('EIToken', '', -1)
  setCookie('EIName', '', -1)
  console.log(getCookie('EIToken'))
}

export function getCookie (cname) {
  var name = cname + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1)
    if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
  }
  return ''
}

export function getAuthenFromToken () {
  let tokenStr = getToken()
  return `Bearer ${tokenStr}`
}

export function getExpFromToken () {
  let exp = null
  let tokenStr = getToken()
  if (tokenStr !== null && tokenStr !== '') {
    let thokenSubStr = tokenStr.split('.')[1]
    let payloadStr = window.atob(thokenSubStr)
    let tokenObj = JSON.parse(payloadStr)
    exp = tokenObj.exp
  }
  return exp
}

export function getUserInfoFromToken () {
  const ADMIN_ROLE = 'admin'
  const GUEST_ROLE = 'guest'
  let user = null
  let token = getToken()
  if (token != null) {
    let payloadBStr = token.split('.')[1]
    if (payloadBStr != null) {
      let payloadStr = Base64.decode(payloadBStr)
      let payload = JSON.parse(payloadStr)
      user = {
        id: payload.id,
        name: payload.user,
        role: payload.role === 1 ? ADMIN_ROLE : GUEST_ROLE,
        loginTs: payload.iat
      }
    }
  }
  return user
}
