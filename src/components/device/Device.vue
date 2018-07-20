<template>
  <div class="device-wrapper">
    <div class="device-header">
      <el-input class="device-search" prefix-icon="el-icon-search" placeholder='查找设备' size="small" v-model="searchDeviceValue"></el-input>
      <button class="device-add" @click="addDevice">添加设备</button>
    </div>
    <div >
      <el-table
        :data="addDeviceData"
        v-show="addDeviceStatus"
        >
        <el-table-column
          align="center"
          header-align="center"
          min-width="80"
          type="index">
        </el-table-column>
        <el-table-column
          align="center"
          prop="deviceNumber"
          label="设备号"
          min-width="200">
          <template slot-scope="scope">
            <el-input type="small" v-model="scope.row.deviceNumber"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="deviceName"
          label="设备名"
          min-width="200">
          <template slot-scope="scope">
            <el-input type="small" v-model="scope.row.deviceName"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="deviceDetail"
          label="设备详情"
          min-width="200">
          <template slot-scope="scope">
            <el-input type="small"  v-model="scope.row.deviceDetail"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          min-width="200">
          <template slot-scope="scope">
            <el-button @click="addDeviceCommit(scope.row)" size="small" >添加</el-button>
            <el-button @click="addDeviceCancel" size="small" >取消</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="device-body">
      <el-table
        :data="deviceList"
        :stripe='true'
        >
        <el-table-column
          align="center"
          header-align="center"
          min-width="80"
          type="index">
        </el-table-column>
        <el-table-column
          align="center"
          prop="deviceNumber"
          label="设备号"
          min-width="200">
        </el-table-column>
        <el-table-column
          align="center"
          label="设备名"
          min-width="200">
            <template slot-scope="scope">
              <span v-show="!scope.row.isEdit">{{scope.row.deviceName}}</span>
              <el-input v-show="scope.row.isEdit" v-model="scope.row.deviceName"></el-input>
            </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="设备详情"
          min-width="200">
            <template slot-scope="scope">
              <span v-show="!scope.row.isEdit">{{scope.row.deviceDetail}}</span>
              <el-input v-show="scope.row.isEdit" v-model="scope.row.deviceDetail"></el-input>
            </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          min-width="200">
          <template slot-scope="scope">
            <el-button @click="deleteDevice(scope.row)" size="small" v-show="!scope.row.isEdit">删除设备</el-button>
            <el-button @click="modifyDevice(scope.row)" size="small" v-show="!scope.row.isEdit">修改设备</el-button>
            <el-button @click="modifyCommit(scope.row)" size="small" v-show="scope.row.isEdit" >确认修改</el-button>
            <el-button @click="modifyCancel(scope.row)" size="small" v-show="scope.row.isEdit" >取消修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {deviceAPI} from '@/api/restfulAPI'
import { Message, MessageBox } from 'element-ui'

export default {
  name: 'Device',
  watch: {
    searchDeviceValue (data) {
      if (data !== '') {
        this.deviceList = []
        for (let i = 0; i < this.deviceListBk.length; i++) {
          if (this.deviceListBk[i]['deviceName'].toLowerCase().search(data.toLowerCase()) !== -1) {
            this.deviceList.push(this.deviceListBk[i])
          }
        }
      } else {
        this.deviceList = this.deviceListBk
      }
    }
  },
  created () {
    if (localStorage.getItem('userId') === null) {
      this.$router.push({name: 'Login'})
    } else {
      this.getDevices()
    }
  },
  data () {
    return {
      deviceList: [],
      deviceListBk: [],
      searchDeviceValue: '',
      addDeviceStatus: false,
      addDeviceData: [{
        deviceName: '',
        deviceNumber: '',
        deviceDetail: ''
      }]
    }
  },
  methods: {
    modifyCommit: function (row) {
      if (row.deviceName === '') {
        Message({message: '设备名称不能为空', type: 'error', duration: 2000})
        return
      }
      row.isEdit = false
      let param = {}
      param['id'] = row.id
      param['deviceName'] = row.deviceName
      param['deviceDetail'] = row.deviceDetail
      console.log(param)
      deviceAPI.updateDevice(param).then(data => {
        Message({message: '修改成功', type: 'success', duration: 2000})
        this.getDevices()
      }).catch(() => {
        Message({message: '修改失败', type: 'error', duration: 2000})
      })
      this.getDevices()
    },
    modifyCancel: function (row) {
      row.isEdit = false
      this.getDevices()
    },
    modifyDevice: function (row) {
      for (let i = 0; i < this.deviceList.length; i++) {
        if (row.id !== this.deviceList[i].id) {
          this.deviceList[i].isEdit = false
        }
      }
      row.isEdit = true
    },
    getDevices () {
      console.log('getDevices')
      let userId = localStorage.getItem('userId')
      deviceAPI.getDeviceList('?userId=' + userId).then(data => {
        for (let i = 0; i < data.devices.length; i++) {
          data.devices[i]['isEdit'] = false
        }
        this.deviceList = data.devices
        this.deviceListBk = data.devices
      }).catch(() => {
        console.log('get devices failure')
      })
    },
    deleteDevice: function (row) {
      MessageBox.confirm('确认删除？', '提示', {
        confirmButtonText: 'yes',
        cancelButtonText: 'no',
        type: 'warning'
      }).then(() => {
        this.loading = true
        deviceAPI.deleteDevice('?deviceId=' + row.id).then(data => {
          Message({message: 'delete successful', type: 'success', duration: 2000})
          this.getDevices()
        }).catch(() => {
          Message({message: 'delete failure', type: 'error', duration: 2000})
        })
      }).catch(() => {
      })
    },
    addDevice () {
      this.addDeviceStatus = true
    },
    addDeviceCancel () {
      this.addDeviceStatus = false
      this.addDeviceData = [{
        deviceName: '',
        deviceNumber: '',
        deviceDetail: ''
      }]
    },
    addDeviceCommit: function (row) {
      if (row.deviceName === '' || row.deviceNumber === '') {
        Message({message: '设备名或设备号不能为空', type: 'error', duration: 2000})
        return
      }
      this.addDeviceStatus = false
      this.addDeviceData = [{
        deviceName: '',
        deviceNumber: '',
        deviceDetail: ''
      }]
      let param = {}
      param['deviceNumber'] = row.deviceNumber
      param['deviceName'] = row.deviceName
      param['deviceDetail'] = row.deviceDetail
      deviceAPI.addDevice(param).then(data => {
        if (data.ErrorCode === '0') {
          Message({message: 'add device successful', type: 'success', duration: 2000})
          this.getDevices()
        } else {
          Message({message: data.ErrorMessage, type: 'error', duration: 2000})
        }
      }).catch(() => {
        Message({message: 'add devicefailure', type: 'error', duration: 2000})
      })
    }
  }
}
</script>

<style lang="scss">

.device-wrapper{
  display: flex;
  flex-shrink: 0;
  flex-grow: 1;
  background-color: white;
  flex-direction: column;
  .device-header {
    width: 100%;
    padding: 10px 0px;
    overflow: hidden;
  .device-search {
    width: 216px;
    height: 32px;
  }
  .device-add {
    width: 210px;
    height: 32px;
    font-weight: bold;
    font-size: 14px;
    background-color: #818181;
    color: white;
  }
  }
}
</style>
