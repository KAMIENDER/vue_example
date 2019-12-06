//todo: 改变字体的格式
// 这一页记录登入相关的用户信息等，其他地方的相关显示可以import这个vue
<template>
  <div class="Login">
    <el-row class="all">
      <el-col :span="10">
        <el-dropdown @command="handleCommand">
        <i class="el-icon-setting" style="color: aliceblue"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">登入</el-dropdown-item>
          <el-dropdown-item command="b">登出</el-dropdown-item>
          <el-dropdown-item command="c">个人主页</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
        <a>{{username}}</a>
      </el-col>
    </el-row>

        <!-- 下面是登入表单 -->
        <el-dialog title="登入" :visible.sync="dialogFormVisible" center width="30%" @close="login_quit">
          <el-form :model="form">
            <el-form-item label="账号" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input v-model="form.code" autocomplete="off" show-password></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="login_quit">取 消</el-button>
            <el-button type="primary" @click="login_sure">确 定</el-button>
          </div>
        </el-dialog>

  </div>
</template>
//todo: 关于用户名的显示以及页面权限的转移这里还需要修改
<script>
import App from '@/App.vue'
import Bus from '@/router/store.js'
import axios from 'axios'
import md5 from 'js-md5'
import { constants } from 'fs';
export default {
  name: 'Login',
  data () {
    return {
      state: false,
      dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          code: ''
        },
        formLabelWidth: '40px',
        username: '未登入'
    }
  },
  methods: {
    handleCommand(command) {
        switch(command){
          case "a":
            this.dialogFormVisible = true;
            break;
          case "b":
            this.username = "未登入"
            this.state = false;
            this.open_suc('登出成功')
            Bus.$emit('state_change_App', this.state);
            break;
          default:
            break;
        }
      },
    login_quit() {
        this.dialogFormVisible = false
      },
    login_sure() {
      // console.log(this.state);
      let _this = this;
      axios.post('/user', {
        Name: this.form.name,
        Key: md5(this.form.code)
      }).then(function(response) {
        if(response.data.status == "ok"){

          _this.username = _this.form.name;
          _this.state = true;
          Bus.$emit('state_change_App', _this.state);
          _this.dialogFormVisible = false;
              
          _this.$root.Name = _this.username;
          _this.$root.Key = md5(_this.form.code);
          _this.$root.Check = response.data.check;

          _this.open_suc('登入成功')
        } else{
          _this.dialogFormVisible = false;
          _thisopen_err('密码或用户名错误')
        }
      }).catch(function(error) {
        console.log(error);
      });
      // 下面这几行在实际工作中要注释掉
      // _this.state = true;
      // Bus.$emit('state_change_App', _this.state);
      // _this.dialogFormVisible = false;
    },
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
  }
}
</script>

<style scoped>
.Login {
  margin-top: 10px;
  color:aliceblue;
}
</style>
