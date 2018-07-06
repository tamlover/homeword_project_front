<template>
    <el-table
      :data="userData"
      style="width: 100%">
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
        prop="device"
        label="设备"
        min-width="300">
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="300">
      </el-table-column>
    </el-table>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
    }
  }
}
</script>
