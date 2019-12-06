<template>
  <div class="shouye">
      <div class="block">
      <div class="head">最近更新</div>
      <el-carousel :height="bannerHeight+'px'">
        <el-carousel-item v-for="item in imgList" :key="item.id">
              <img ref="bannerHeight" :src="item.idView" class="image" @load="imgLoad" @click="check(item.id)"/>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import Bus from '@/router/store.js'
export default {
  name: 'shouye',
  data () {
    return {
      bannerHeight: '',
      imgList: [
          {id: 1, idView: require('@/assets/1.jpg')},
          {id: 2, idView: require('@/assets/2.jpg')},
          {id: 3, idView: require('@/assets/3.jpg')},
          {id: 4, idView: require('@/assets/4.jpg')}
        ]
    }
  },
  methods: {
    imgLoad(){
      this.$nextTick(()=>{
        this.bannerHeight=this.$refs.bannerHeight[0].height
        console.log(this.$refs.bannerHeigh[0].height);
      })
    },
    check(val){
      console.log("check");
      console.log(val);
      Bus.$emit('pic_click', val);
    }
  },
  mounted(){
    this.imgLoad();
    window.addEventListener('resize', () => {
      this.bannerHeight=this.$refs.bannerHeight[0].height;
      this.imgLoad();
    },false)
  }
}
</script>

<style scoped>
/* .+内部div class的名字可以修改style */

.block {
  text-align: center;
  font-size: 30px;
}
</style>
