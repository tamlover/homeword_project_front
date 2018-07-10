<template>
    <el-table
      v-loading="loading"
      :data="userList"
      header-align="left"
      >
      <el-table-column
        prop="account"
        label="账户"
        min-width="300">
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名"
        min-width="300">
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="300">
        <template slot-scope="scope">
          <el-button size="small" >删除用户</el-button>
          <el-button size="small" >修改用户</el-button>
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
import {userAPI} from '@/api/restfulAPI'
// import { Message, MessageBox } from 'element-ui'

export default {
  name: 'User',
  data () {
    return {
      userList: []
    }
  },
  created () {
    this.getUsers()
  },
  methods: {
    getUsers () {
      console.log('getusers')
      userAPI.getUsers().then(data => {
        this.userList = data.users
      }).catch(() => {
        console.log('get user failure')
      })
    }
  }
}
</script>
