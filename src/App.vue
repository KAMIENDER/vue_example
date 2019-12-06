
<template>
  <div id="app">
    <el-container>
       <el-aside width="200px">
        <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        collapse-transition>
        <el-submenu index="0">
          <template slot="title">
            <i class="el-icon-picture"></i>
            <span>二刺螈</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-0" @click="goTo('/animate')">Animate</el-menu-item>
            <el-menu-item index="1-1">选项2</el-menu-item>
          </el-menu-item-group>
          <!-- <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu> -->
        </el-submenu >
        <el-menu-item index="2" @click="goTo('/blog')">
          <i class="el-icon-menu"></i>
          <span slot="title">博客</span>
        </el-menu-item>

        <el-submenu index="3" :disabled="this.t">
          <template slot="title" >
            <i class="el-icon-document"></i>
            <span>网盘</span>
          </template>
          <el-menu-item-group >
            <el-menu-item index="1-1" @click="goTo('/wangpan')" :disabled="this.t">文件</el-menu-item>
            <el-menu-item index="1-2" @click="goTo('/upload')" :disabled="this.t">上传</el-menu-item>
          </el-menu-item-group>
        </el-submenu >

        <el-menu-item index="4" @click="goTo('/')">
          <i class="el-icon-setting"></i>
          <span slot="title">首页</span>
        </el-menu-item>
      </el-menu>
      </el-aside>

      <el-container>
        <el-header height="40px" style="text-align: left; font-size: 15px; background-color: #909399">
        <login></login>
        <!-- 上面以及下面scrip处的代码就是 -->
        </el-header>
      <el-main style="height: 100%">
        <router-view></router-view>
      </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Login from '@/components/login.vue'
import Bus from '@/router/store.js'

export default {
  name: 'App',
  components: {
    login: Login
  },
  data () {
        return {
            t: true
        }
    },
  methods: {
    handleOpen: function (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose: function (key, keyPath) {
      // console.log(key, keyPath)
    },
    goTo: function (path) {
      // console.log(this.$router)
      this.$router.replace(path)
    },
  },
  mounted() {
    let _this = this;
    // 上一句是必须的作用域不同导致下面的this失效，同时如果监听的是data中的数组值的话，需要用其他的函数如push等进行刷新
    Bus.$on('state_change_App', function(newVal){
      if(newVal==false){
        _this.goTo("/");
      }
      _this.t = !newVal;
    })
    // 下面这个适用于点击封面的图片进入该动漫
    Bus.$on('pic_click', function(val){
      console.log("check2");
      switch(val){
        default:
          break;
      }
    })
    Bus.$on('router_change', function(val){
      console.log(val)
      _this.goTo(val)
    })
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 0px;
  margin-left: 0%;
}
.el-menu-item {
    min-width: 0px;
}
</style>
