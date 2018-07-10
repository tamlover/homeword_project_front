<template>
  <div>
    <div>
      <el-input  prefix-icon="el-icon-search" placeholder='查找设备' size="small" v-model="searchDeviceValue"></el-input>
      <button @click="test">添加设备</button>
    </div>
    <div>
      <el-table
        :data="deviceList"
        v-loading="loading">
        <el-table-column
        align="center"
        header-align="center"
        min-width="80"
        type="index">
        </el-table-column>
        <el-table-column
          prop="deviceNumber"
          label="设备号"
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="deviceName"
          label="设备名"
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="deviceDetial"
          label="设备详情"
          min-width="200">
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="200">
          <template slot-scope="scope">
            <el-button @click="deleteDevice(scope.row)" size="small" >删除设备</el-button>
            <el-button @click="updateDevice(scope.row)" size="small" >修改设备</el-button>
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
  created () {
    this.getDevices()
  },
  data () {
    return {
      deviceList: [],
      searchDeviceValue: ''
    }
  },
  methods: {
    test () {
      console.log('123123123')
    },
    getDevices () {
      console.log('getDevices')
      let user = localStorage.getItem('user')
      deviceAPI.getDevices('?userId=' + user.id).then(data => {
        this.deviceList = data.devices
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
        const param = {}
        param['id'] = row.id
        this.loading = true
        deviceAPI.deleteDevice(param).then(data => {
          Message({message: 'delete successful', type: 'success', duration: 2000})
        }).catch(() => {
          Message({message: 'delete failure', type: 'error', duration: 2000})
        })
      }).catch(() => {
      })
    }
  }
}
</script>
