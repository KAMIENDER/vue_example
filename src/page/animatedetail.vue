<template>
  <div class="detail">
      <el-container>
          <el-aside width="450px">
              <el-image :src="idView"></el-image>
          </el-aside>
          <el-container>
              <el-header>
                  <el-card class="box-card" style="width: 400px">
                      {{msg}}
                  </el-card>
              </el-header>
              <el-main>
                  <el-card class="box-card">
                      <el-row>
                        <el-col :span="3" v-for="item in items" :key="item.id">
                            <el-card shadow="hover" style="margin-left:10%; height: 30px; font-size: 10px">
                                <div class="a" style="vertical-align:middle">
                                    第{{item.id}}集
                                </div>
                                
                            </el-card>
                        </el-col>
                      </el-row>
                  </el-card>
              </el-main>
          </el-container>
      </el-container>
  </div>
</template>

<script>
import Bus from '@/router/store.js'
export default {
  name: 'detail',
  data () {
    return {
      items: [
        {id: 1, url:""},
        {id: 2, url:""},
        {id: 3, url:""}
      ],
      msg: 'detail',
      idView: require('@/assets/2.jpg')
    }
  },
  methods: {
      geturl: function(url) {
          this.msg = url
          
      }
  },
  created() {
    //   下面是接收路由传过来的参数
      this.msg = this.$route.params.url
      console.log(this.$route.params.url)
  }
}
</script>

<style scoped>
h1 {
  font-weight: normal;
  text-align: center;
  height: 10px;
  width: 20px;
  margin-left: 45%;
  margin-top: 10%;
}
.el-aside {
    background-color: aqua
}
</style>
