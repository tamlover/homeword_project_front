<template>
    <div class="login-wrapper">
        <form class="login-form">
          <div class="login-title">登录</div>
          <div class="nav">
            <div class="nav login_nav">
              <div class="login_username">
                账&nbsp;&nbsp;&nbsp;户:
                <input class="login_usernameInput" type="text" id="name" v-model="account" />
              </div>
            </div>
            <div class="nav login_psdNav">
              <div class="login_pwd">
                密&nbsp;&nbsp;&nbsp;码:
                <input type="password" class="login_pwdInput" id="psd" v-model="password"/>
              </div>
            </div>
            <div class="login_btn_div">
              <el-button  class="sub_btn" @click="loginSubmit">登录</el-button>
            </div>
          </div>
        </form>
    </div>
</template>

<script>

import {loginAPI} from '@/api/restfulAPI'
import { Message } from 'element-ui'
import * as tokenPrc from '@/js/tokenProcess'

export default {
  name: 'Login',
  data () {
    return {
      account: '',
      password: '',
      tipMessage: '',
      errFlag: ''
    }
  },
  methods: {
    loginSubmit () {
      let param = {}
      param['account'] = this.account
      param['password'] = this.password
      loginAPI.loginWithPwd(param).then(data => {
        // localStorage.setItem('token', 'Bearer ' + data.token)
        tokenPrc.setToken(data.token)
        if (data.ErrorCode === '0') {
          this.$router.push({name: 'Device'})
          localStorage.setItem('userId', data.user.userId)
        } else {
          Message({message: data.ErrorMessage, type: 'error', duration: 2000})
        }
      }).catch(error => {
        if (error.errCode === 500) {
          console.log(error.data)
          this.tipMessage = error.data.data
          this.errFlag = true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-wrapper{
    background: url('../../assets/images/sky.jpg') center center no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-size: 100% 100%;
    background-attachment: fixed;
    overflow: hidden;
  }
  .login-form{
    text-align: center;
    width:500px;
    height:400px;
    top: 50%;
    left: 50%;
    color: black;
    margin-top: -250px;
    margin-left: -250px;
    position:fixed;
    border-radius:10px;
    z-index: 9999;
    background: #FFFFFF;
    opacity: 0.7;
    box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.5);
  }
  .login-form .login-title{text-align: center; font-size: 35px; margin-top: 30px; letter-spacing: 5px; font-weight: bold;}
  .login_nav{margin-top: 80px;}
  .login_username{text-align: center; height: 40px; line-height: 40px; font-size: 20px; font-weight: bold;}
  .login_username .login_usernameInput{height: 40px; padding: 0px; width:300px;}
  #name{font-size: 12px; height: 40px; outline: 0px; border-radius: 10px; border: 1px solid #CCCCCC;}
  .login_psdNav{margin-top: 30px;}
  .login_pwd {text-align: center; height: 40px; line-height: 40px; font-size: 20px; font-weight: bold;}
  .login_pwd .login_pwdInput {height: 40px; padding: 0px; width: 300px;}
  #psd{height: 40px; font-size: 12px; outline: 0px; border-radius: 10px; border: 1px solid #CCCCCC;}
  .login_btn_div{text-align: center; margin-top: 30px; padding-left: 50px;}
  .sub_btn{outline: 0px; border: 0px; width: 200px; height: 40px; border-radius: 10px; background-color: rgba(0, 81, 255, 0.411); color: white; font-weight: bold; font-size: 20px;}
  .sub_btn:hover{background: #31B0D5;}
</style>
