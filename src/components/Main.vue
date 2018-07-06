<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
      <el-container>
        <el-aside >
          <el-row>
            <el-button @click="goTo('Device')">Go to Device</el-button>
          </el-row>
          <el-row>
            <el-button @click="goTo('User')">Go to User</el-button>
          </el-row>
          <el-row>
            <el-button @click="goTo('Login')">Go to Login</el-button>
          </el-row>
        </el-aside>
        <el-container>
          <el-main>
            <router-view/>
          </el-main>
        </el-container>
      </el-container>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      msg: 'Welcome to My Project'
    }
  },
  methods: {
    goTo (text) {
      this.$router.push({name: text})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.el-aside {
  width: "200px";
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 100px;
}
</style>
