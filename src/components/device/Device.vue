<template>
    <el-table
      :data="userData"
      style="width: 100%">
      <el-table-column
        prop="account"
        label="设备号"
        min-width="300">
      </el-table-column>
      <el-table-column
        prop="name"
        label="设备名"
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
  name: 'Device',
  data () {
    return {
    }
  }
}
</script>
