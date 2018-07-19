<template>
  <div class="main-wrapper">
      <el-container>
        <el-header>
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1" @click="goTo('Device')">设备管理</el-menu-item>
            <el-menu-item index="2" @click="goTo('User')" v-show="isAdmin()">用户管理</el-menu-item>
            <el-popover
              placement="top-start"
              width="110"
              trigger="hover"
              >
                <div class="user-select" @click="changePwd">
                  <p>更改密码</p>
                </div>
                <div class="user-select" @click="logout">
                  <p>logout</p>
                </div>
              <el-button slot="reference" class="user-profile-button">用户</el-button>
            </el-popover>
          </el-menu>
          <div>
            <el-dialog  :visible.sync="changePassword" aligin = center>
              <p class="password-title">修改密码</p>
              <el-input type="password" placeholder="旧密码" v-model="oldPassword" class = "password-input"></el-input><br>
              <el-input type="password" placeholder="新密码" v-model="newPassword" class = "password-input"></el-input><br>
              <el-input type="password" placeholder="再次输入新密码" v-model="newPasswordAgain" class = "password-input"></el-input>
              <el-button type="small" @click="changePasswordCommit" class = "password-button">确认修改</el-button>
              <el-button type="small" @click="changePasswordCancel" class = "password-button">取消修改</el-button>
            </el-dialog>
          </div>
        </el-header>
        <el-container>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
      </el-container>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import {userAPI} from '@/api/restfulAPI'

export default {
  name: 'Main',
  created () {
    console.log('userId is:' + localStorage.getItem('userId'))
  },
  data () {
    return {
      changePassword: false,
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: '',
      msg: 'Welcome to My Project',
      activeIndex: '1'
    }
  },
  methods: {
    changePasswordCommit () {
      if (this.oldPassword === '' || this.newPassword === '' || this.newPasswordAgain === '') {
        Message({message: '原密码、新密码、再次输入新密码都不能为空', type: 'error', duration: 2000})
        return
      } else if (this.newPassword !== this.newPasswordAgain) {
        Message({message: '新密码与再次输入新密码的不相同', type: 'error', duration: 2000})
        return
      }
      let param = {}
      param['userId'] = localStorage.getItem('userId')
      console.log(localStorage.getItem['userId'])
      param['oldPassword'] = this.oldPassword
      param['newPassword'] = this.newPassword
      userAPI.changePassword(param).then(data => {
        this.oldPassword = ''
        this.newPassword = ''
        this.newPasswordAgain = ''
        if (data.ErrorCode === '1') {
          Message({message: '密码修改失败', type: 'error', duration: 2000})
        } else {
          Message({message: '密码修改成功', type: 'success', duration: 2000})
        }
      }).catch(() => {
        Message({message: '密码修改失败', type: 'error', duration: 2000})
      })
      this.changePassword = false
    },
    changePasswordCancel () {
      this.changePassword = false
      this.oldPassword = ''
      this.newPassword = ''
      this.newPasswordAgain = ''
    },
    changePwd () {
      this.changePassword = true
    },

    goTo (text) {
      this.$router.push({name: text})
    },
    logout () {
      this.$router.push({name: 'Login'})
      localStorage.removeItem('userId')
      localStorage.removeItem('token')
    },
    isAdmin () {
      if (localStorage.getItem('userId') === '1') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .main-wrapper {
    display: flex;
    flex-shrink: 0;
    flex-grow: 1;
    background-color: white;
    flex-direction: column;
    .password-input {
    margin-bottom: 15px;
    }
    .password-title {
      text-align: center;
      font-size: 15px;
      margin-top: -30px;
      letter-spacing: 5px;
      font-weight: bold;
    }
    .user-profile-button {
      margin-top: 10px;
    }
  }
  .el-aside {
    background-color: #545c64;
    color: #333;
    text-align: center;
  }
  .el-main {
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 100px;
  }
  .el-header {
    text-align: right;
  }
  .user-select{
    height: 40px;
    cursor: pointer;
    p{
      margin: 0px;
      line-height: 40px;
      padding-left: 10px;
    }
  }
  .user-select:nth-child(odd){
    background-color: #D3DCE6
  }
  .user-select:nth-child(even){
    background-color: white
  }

</style>
