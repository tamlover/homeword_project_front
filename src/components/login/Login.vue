<template>
    <div class="login-wrapper">
      <el-form class="login-form">
        <el-form-item>
          <input type="text" class="form-control" placeholder="账户" maxlength="253">
        </el-form-item>
        <el-form-item>
          <input type="password"  placeholder="密码" maxlength="253">
        </el-form-item>
        <el-form-item>
          <el-button>登录</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
  .login-wrapper{
    background: url('../../assets/images/sky.jpg') center center no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  .login-form{
    text-align:center;
  }
</style>
