<template>
  <div class="page2">
    <el-row>
      <!-- offset可以调整card之间的距离 -->
      <el-col :span="4" v-for="item in items" :key="item.id">
        <b @click="goTo(item.url)">
          <!-- padding:边框填充 -->
          <el-card shadow="hover" :body-style="{padding:'0px'}">
            
            <el-image :src="item.idView" :fit="fit"></el-image>

            <div style="padding:20px;background-color: #eee">
              <t class="demonstration" >{{item.title | ellipsis}}</t>
            </div>
          </el-card>
        </b> 
        
      </el-col>
    </el-row>
      
  </div>
</template>

<script>
import axios from 'axios'
import Bus from '@/router/store.js'
export default {
  name: 'animate',
  filters: {
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 8) {
        return value.slice(0,8) + '...'
      }
      return value
    }
  },
  data () {
    return {
      items: [
        {id: 1, idView: require('@/assets/1.jpg'), url:"", title:"1"},
        {id: 2, idView: require('@/assets/2.jpg'), url:"", title:"2"},
        {id: 2, idView: require('@/assets/3.jpg'), url:"", title:"3"}
      ],
      msg: 'animate'
    }
  },
  methods: {
    goTo: function(path) {
      // 跳转外部链接
      // window.location.href = path
      // 并且在新的页面中打开
      // window,open(path,"_blank")
      
      // 进行路由传参
      console.log("test")
      this.$router.push({
        name: 'animate_detail',
        params: {
          url: path
        }
      })
      // Bus.$emit('router_change',"/detail")
      
    }
  },
  created (){
    let _this = this;
    axios.get("/animate").then(function(response){
      _this.items.splice(0,3);
      console.log(response.data);
      console.log(response.data.length)

      var one = 0;
      for(one = 0; one < response.data.length; one++) {
        console.log(one);
        _this.items.push({
          id: response.data[one].id,
          idView: response.data[one].idView,
          url: response.data[one].url,
          title: response.data[one].title
        })
      }

    }).catch(function(error){
      console.log(error)
    })
  }
}
</script>

<style scoped>
.b {
  position: relative;
  padding-top: 25%;
  overflow: hidden;
  width: 25%;
  float: left
}
</style>
