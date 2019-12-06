<template>
    <div style="float: left">
    <uploader :options="options" class="uploader-example">
    <uploader-unsupport></uploader-unsupport>
      <uploader-btn>选择文件</uploader-btn>
      <uploader-btn :attrs="attrs" >选择图片</uploader-btn>
      <uploader-btn :directory="true">选择文件夹</uploader-btn>
    <uploader-list></uploader-list>
  </uploader>
  </div>
  
</template>

<script>
import Bus from '@/router/store.js'
import axios from 'axios'
import wangpan from '@/page/wangpan.vue'
import md5 from 'js-md5'
  export default {
    name: "Upload",
    data () {
      return {
        
        options: {
          // https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
          target: '//localhost:8082/upload',
          testChunks: false
        },
        attrs: {
          accept: 'image/*'
        }
      }
    },
    methods: {
      open_suc(str) {
        this.$message({
          message: str,
          type: 'success'
        });
      },

      open_war(str) {
        this.$message({
          message: str,
          type: 'warning'
        });
      },

      open_err(str) {
        this.$message.error(str);
      }
    },
    created(){
      console.log(wangpan.data.path);
      this.path = wangpan.path;
      let _this = this;

      axios.post('/upload/user', {
        Name: this.$root.Name,
        Key: this.$root.Key,
        Check: md5(this.$root.Check)
      }).then(function(response) {
        console.log("in function");
        console.log(response.data);
        if(response.data != "false"){
          console.log("in check")
          this.$root.Check = response.data
        } else {
          _this.open_err('请重新登入')
          Bus.$emit('state_change_App', false);
        }
      }).catch(function(error) {
        console.log(error);
      });
    }
  }
</script>

<style>
  .uploader-example {
    width: 101%;
    font-size: 12px;
    
  }
  .uploader-example .uploader-btn {
    margin-right: 0%
  }
  .uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>