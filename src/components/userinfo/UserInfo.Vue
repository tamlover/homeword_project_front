<template>
  <div>
    <div class="user-header">
      <el-input class="user-search" prefix-icon="el-icon-search" placeholder='查找用户' size="small" v-model="searchUserValue"></el-input>
      <button class="user-add" @click="addUser">添加用户</button>
    </div>
    <div>
       <el-table
        :data="addUserData"
        v-show="userAddStatus"
        >
        <el-table-column
          type="index"
          align="center"
          header-align="center"
          width="50">
        </el-table-column>
        <el-table-column
          prop="account"
          label="账户"
          min-width="200"
          align=center>
          <template slot-scope="scope">
            <el-input v-model="scope.row.account" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="用户名"
          min-width="200"
          align=center>
          <template slot-scope="scope">
            <el-input v-model="scope.row.userName" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="密码"
          min-width="200"
          align=center>
          <template slot-scope="scope">
            <el-input v-model="scope.row.password" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="200"
          align=center>
          <template slot-scope="scope">
            <el-button @click="userAddCommit(scope.row)" size="small" >添加用户</el-button>
            <el-button @click="userAddCancel" size="small" >取消添加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-table
        :data="userList"
        header-align="left"
        :stripe='true'
        >
        <el-table-column
          type="index"
          align="center"
          header-align="center"
          width="50">
        </el-table-column>
        <el-table-column
          prop="account"
          label="账户"
          min-width="200"
          align=center>
          <template slot-scope="scope">
            <span v-if="!scope.row.isEdit">{{scope.row.account}}</span>
            <el-input v-if="scope.row.isEdit" v-model="scope.row.account"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="用户名"
          min-width="200"
          align=center>
          <template slot-scope="scope">
            <span v-if="!scope.row.isEdit">{{scope.row.userName}}</span>
            <el-input v-if="scope.row.isEdit" v-model="scope.row.userName"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="设备"
          min-width="200"
          align=center>
            <template slot-scope="scope">
              <div @click="deviceManagement(scope.row)" style="cursor:pointer">
                <span v-if="!scope.row.isEdit">{{scope.row.devices.length}}</span>
              </div>
            </template>
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="300"
          align=center>
          <template slot-scope="scope">
            <el-button @click="deleteUser(scope.row)" size="small" v-show="!scope.row.isEdit" >删除用户</el-button>
            <el-button @click="modifyUser(scope.row)" size="small" v-show="!scope.row.isEdit" >修改用户</el-button>
            <el-button @click="modifyCommit(scope.row)" size="small" v-show="scope.row.isEdit" >确认修改</el-button>
            <el-button @click="modifyCancel(scope.row)" size="small" v-show="scope.row.isEdit" >取消修改</el-button>
            <el-button  @click="deviceManagement(scope.row)" size="small" v-show="!scope.row.isEdit">设备管理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="设备管理" :visible.sync="deviceTableVisible">
        <div>
          <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            active-text-color="#ffd04b" >
            <el-menu-item index='1' @click="deleteDevices" class="device-operate-item">解除设备</el-menu-item>
            <el-menu-item index='2' @click="addDevices" class="device-operate-item">添加设备</el-menu-item>
          </el-menu>
        </div>
        <div>
          <el-table
            v-show="addBindingStatus"
            :data="notBingdingDevices"
            :stripe='true'
            align=center
            @selection-change="addTableSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column property="deviceNumber" label="设备号" width="150"></el-table-column>
            <el-table-column property="deviceName" label="设备名" width="200"></el-table-column>
            <el-table-column property="deviceDetail" label="设备详细信息"></el-table-column>
          </el-table>
          <el-table
          v-show="!addBindingStatus"
          :data="bingdingDevices"
          :stripe='true'
          align=center
          @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column property="deviceNumber" label="设备号" width="150"></el-table-column>
            <el-table-column property="deviceName" label="设备名" width="200"></el-table-column>
            <el-table-column property="deviceDetail" label="设备详细信息"></el-table-column>
          </el-table>
        </div>
        <div>
          <el-button @click="deleteBinding" v-show="!addBindingStatus">确认解除设备</el-button>
          <el-button @click="deleteBindingCancel" v-show="!addBindingStatus">取消解除</el-button>
          <el-button @click="addBinding" v-show="addBindingStatus">确认添加设备</el-button>
          <el-button @click="addBindingCancel" v-show="addBindingStatus">取消添加</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {userAPI, deviceAPI} from '@/api/restfulAPI'
import { Message, MessageBox } from 'element-ui'

export default {
  name: 'User',
  watch: {
    searchUserValue (data) {
      if (data !== '') {
        this.userList = []
        for (let i = 0; i < this.userListBK.length; i++) {
          if (this.userListBK[i]['userName'].toLowerCase().search(data.toLowerCase()) !== -1) {
            this.userList.push(this.userListBK[i])
          }
        }
      } else {
        this.userList = this.userListBK
      }
    }
  },
  data () {
    return {
      activeIndex: '1',
      addBindingStatus: false,
      notBingdingDevices: [{
        id: '',
        deviceNumber: '',
        deviceName: '',
        deviceDetail: ''
      }],
      deviceTableVisible: false,
      userList: [],
      userListBK: [],
      searchUserValue: '',
      userAddStatus: false,
      addUserData: [{
        userName: '',
        account: '',
        password: ''
      }],
      bingdingDevices: [{
        id: '',
        deviceNumber: '',
        deviceName: '',
        deviceDetail: ''
      }],
      deviceSelection: [],
      userId: ''
    }
  },
  created () {
    if (localStorage.getItem('userId') === null) {
      this.$router.push({name: 'Login'})
    } else if (localStorage.getItem('userId') !== '1') {
      this.$router.push({name: 'Device'})
    } else {
      this.getUsers()
    }
  },
  methods: {
    getNotBindingDevices (bingdingDeviveList) {
      deviceAPI.getDeviceList('?userId=1').then(data => {
        let existFlag
        for (let i = 0; i < data.devices.length; i++) {
          existFlag = false
          for (let j = 0; j < bingdingDeviveList.length; j++) {
            if (data.devices[i]['id'] === bingdingDeviveList[j]['id']) {
              existFlag = true
            }
          }
          if (!existFlag) {
            this.notBingdingDevices.push(data.devices[i])
          }
        }
      }).catch(() => {
        console.log('get notBindingdevices failure')
      })
    },
    deleteBindingCancel () {
      this.deviceTableVisible = false
      this.deviceSelection = []
    },
    addBindingCancel () {
      this.deviceTableVisible = false
      this.addBindingStatus = false
      this.deviceSelection = []
    },
    deleteDevices () {
      this.addBindingStatus = false
    },
    addDevices () {
      this.addBindingStatus = true
    },
    addBinding () {
      if (this.deviceSelection.length !== 0) {
        let param = {}
        let deviceIds = []
        for (let i = 0; i < this.deviceSelection.length; i++) {
          deviceIds.push(this.deviceSelection[i]['id'])
          this.bingdingDevices.push(this.deviceSelection[i])
          for (let j = 0; j < this.notBingdingDevices.length; j++) {
            if (this.notBingdingDevices[j]['id'] === this.deviceSelection[i]['id']) {
              this.notBingdingDevices.splice(j, 1)
              break
            }
          }
        }
        param['deviceIds'] = deviceIds
        param['userId'] = this.userId

        userAPI.addBinding(param).then(data => {
          this.getUsers()
          this.deviceSelection = []
          Message({message: '添加绑定成功', type: 'success', duration: 2000})
        }).catch(() => {
          Message({message: '添加绑定失败', type: 'error', duration: 2000})
        })
      }
    },
    deleteBinding () {
      if (this.deviceSelection.length !== 0) {
        let param = {}
        let deviceIds = []
        for (let i = 0; i < this.deviceSelection.length; i++) {
          deviceIds.push(this.deviceSelection[i]['id'])
          this.notBingdingDevices.push(this.deviceSelection[i])
          for (let j = 0; j < this.bingdingDevices.length; j++) {
            if (this.bingdingDevices[j]['id'] === this.deviceSelection[i]['id']) {
              this.bingdingDevices.splice(j, 1)
              break
            }
          }
        }
        param['deviceIds'] = deviceIds
        param['userId'] = this.userId

        userAPI.deleteBinding(param).then(data => {
          this.getUsers()
          this.deviceSelection = []
          Message({message: '解除绑定成功', type: 'success', duration: 2000})
        }).catch(() => {
          Message({message: '解除绑定失败', type: 'error', duration: 2000})
        })
      }
    },
    addTableSelectionChange (val) {
      if (val) {
        this.deviceSelection = val
      }
    },
    handleSelectionChange (val) {
      if (val) {
        this.deviceSelection = val
      }
    },
    modifyCommit: function (row) {
      if (row.account === '' || row.userName === '') {
        Message({message: '用户名或账户不能为空', type: 'error', duration: 2000})
        return
      }
      row.isEdit = false
      let param = {}
      param['userId'] = row.userId
      param['account'] = row.account
      param['userName'] = row.userName
      userAPI.updateUser(param).then(data => {
        Message({message: '修改成功', type: 'success', duration: 2000})
      }).catch(() => {
        Message({message: '修改失败', type: 'error', duration: 2000})
      })
      this.getUsers()
    },
    modifyCancel: function (row) {
      row.isEdit = false
      this.getUsers()
    },
    modifyUser: function (row) {
      for (let i = 0; i < this.userList.length; i++) {
        if (row.id !== this.userList[i].userId) {
          this.userList[i].isEdit = false
        }
      }
      row.isEdit = true
    },
    userAddCommit: function (row) {
      if (row.account === '') {
        Message({message: '账户不能为空', type: 'error', duration: 2000})
        return
      }
      this.addUserData = [{
        userName: '',
        account: ''
      }]
      this.userAddStatus = false
      let param = {}
      param['account'] = row.account
      param['userName'] = row.userName
      param['password'] = row.password
      userAPI.addUser(param).then(data => {
        Message({message: 'add successful', type: 'success', duration: 2000})
        this.getUsers()
      }).catch(() => {
        Message({message: 'add failure', type: 'error', duration: 2000})
      })
    },
    addUser () {
      this.userAddStatus = true
    },
    userAddCancel () {
      this.userAddStatus = false
      this.addUserData = [{
        userName: '',
        account: ''
      }]
    },
    getUsers () {
      console.log('getusers')
      userAPI.getUsers().then(data => {
        for (let i = 0; i < data.users.length; i++) {
          data.users[i].isEdit = false
          data.users[i].isEdit = false
        }
        this.userList = data.users
        this.userListBK = data.users
      }).catch(() => {
        console.log('get user failure')
      })
    },
    deleteUser: function (row) {
      MessageBox.confirm('确认删除？', '提示', {
        confirmButtonText: 'yes',
        cancelButtonText: 'no',
        type: 'warning'
      }).then(() => {
        userAPI.deleteUser('?userId=' + row.userId).then(data => {
          Message({message: 'delete successful', type: 'success', duration: 2000})
          this.getUsers()
        }).catch(() => {
          Message({message: 'delete failure', type: 'error', duration: 2000})
        })
      }).catch(() => {
      })
    },
    deviceManagement: function (row) {
      this.bingdingDevices = []
      this.notBingdingDevices = []
      this.deviceTableVisible = true
      this.bingdingDevices = row.devices
      this.getNotBindingDevices(row.devices)
      this.userId = row.userId
    }
  }
}
</script>

<style>
.el-dialog__header{
  height: 20px;
}
  .user-search {
    width: 216px;
    height: 32px;
  }
  .user-add {
    width: 210px;
    height: 32px;
    font-weight: bold;
    font-size: 14px;
    background-color: #818181;
    color: white;
  }
  .device-operate-item {
    width: 50%;
  }
</style>
