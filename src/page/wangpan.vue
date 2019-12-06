<template>
<div class="all">
  <!-- 下面这个是按钮及搜索框 -->
  
    <el-container>
      <el-header>
        <div class="operation" style="float: right; margin-top:0%;">  
        <el-input size="mini" placeholder="请输入内容" v-model="search" style="width: 200px">
          <el-button slot="append" icon="el-icon-search" ></el-button>
          </el-input>
          <el-button round size="mini" type="info" @click="upsee=true">上传</el-button>
          <el-button round size="mini" style="margin-left:-0.1%;" type="info" @click="downsee=true">下载</el-button>
        </div>
        <div style="float: left; margin-left: 0px;">
            <el-input v-model="path" style="width: 400px;" size="mini"  >
            <template slot="prepend">当前路径: </template>
            </el-input>
          <el-button round size="mini" type="info">删除</el-button>
          <el-button round size="mini" type="info" style="margin-left:-0.1%;" @click="toggleSelection(tableData)">选择反选</el-button>    
          <el-button round size="mini" type="info" style="margin-left:-0.1%;" @click="toggleSelection()">清空选择</el-button> 
        </div>
      </el-header>
      
    </el-container>
    
    
    

<!-- 下面是可多选表格 -->
<el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="文件名"
      width="240">
      <template slot-scope="scope">{{ scope.row.name }}</template>
    </el-table-column>
    <el-table-column
      prop="date"
      label="创建时间"
      width="240">
    </el-table-column>
    <el-table-column
      prop="size"
      label="大小"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>

  <!-- 下面是上传表单 -->
        <el-dialog title="上传" :visible.sync="upsee" center width="30%" @close="upsee=false">
          <el-form :model="upload_info">
            <el-form-item label="路径" :label-width="formLabelWidth">
              <input type="file" value="" id="file" @change="uploadConfig">
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="upsee=false">取 消</el-button>
            <el-button type="primary" @click="upload_sure()">确 定</el-button>
          </div>
        </el-dialog>

  <!-- 下面是下载表单 -->
        <el-dialog title="下载" :visible.sync="downsee" center width="30%" @close="downsee=false">
          <el-form :model="download_info">
            <el-form-item label="路径" :label-width="formLabelWidth">
              <el-input v-model="download_info.path" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="downsee=false">取 消</el-button>
            <el-button type="primary" @click="download_sure()">确 定</el-button>
          </div>
        </el-dialog>

</div>
</template>

<script>
import Bus from '@/router/store.js'
import Login from '@/components/login.vue'
import axios from 'axios'
import { constants } from 'fs';
import md5 from 'js-md5'

  export default {
    name: "wangpan",
    data() {
      return {
        upsee: false,
        downsee: false,
        formLabelWidth: '40px',

        upload_info: {
          path: '上传路径'
        },
        download_info: {
          path: '下载路径'
        },

        search: '',
        path:'home',
        tableData: [{
          name: '文件1',
          date: '2019.7.27',
          size: '39MB'
        },{
          name: '文件2',
          date: '2019.7.17',
          size: '21MB'
        }],
        multipleSelection: []
      }
    },

    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      upload_sure(){
        this.upsee = false;
      },
      download_sure(){
        let _this = this

        var t
        var x
        t = 0
        for(x in _this.multipleSelection){
          _this.to_download(t)
          t = t + 1
        }

        this.downsee = false;
      },
      uploadConfig(e) {
        let formData = new FormData();
        formData.append('file', e.target.files[0]);
        let url = this.$store.state.path + "api/tools/handle_upload_file";
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        };
        this.$axios.post(url,formData, config).then(function (response) {
          console.log(response.data)

        })

      },
      to_download(t){
        let _this = this
        console.log(t)
        axios.post(
          'download',//请求的url
          {
            User: _this.$root.Name,
            Files: _this.multipleSelection[t],
            Check: md5(_this.$root.Check)
          },
          {
              responseType:'blob'//服务器返回的数据类型
          }
          ).then((res)=>{
              //此处有个坑。这里用content保存文件流，最初是content=res，但下载的test.xls里的内容如下图1，
              //检查了下才发现，后端对文件流做了一层封装，所以将content指向res.data即可
              //另外，流的转储属于浅拷贝，所以此处的content转储仅仅是便于理解，并没有实际作用=_=
              if(res.data == "false"){
                console.log("invalid")
                Bus.$emit('state_change_App', false);
                open_err('请重新登入')
              }else{
                _this.$root.Check = md5(_this.$root.Check)
                const content = res.data
                const blob = new Blob([content])//构造一个blob对象来处理数据
                // var fileName 
                // fileName = _this.multipleSelection[t].name
                console.log(_this.multipleSelection[t].name)
                console.log(t)
                //对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
                //IE10以上支持blob但是依然不支持download
                if ('download' in document.createElement('a')) { //支持a标签download的浏览器
                  const link = document.createElement('a')//创建a标签
                  link.download = _this.multipleSelection[t].name//a标签添加属性
                  link.style.display = 'none'
                  link.href = URL.createObjectURL(blob)
                  document.body.appendChild(link)
                  link.click()//执行下载
                  URL.revokeObjectURL(link.href) //释放url
                  document.body.removeChild(link)//释放标签
                } else { //其他浏览器
                  navigator.msSaveBlob(blob, _this.multipleSelection[t].name)
                }
              }
            }).catch((err)=>{
                console.log(err);
            })
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
      
    },
    watch:{
      path: function() {
        console.log("change");
        Bus.$emit("upload_path_change", this.path);
      }
    },
    created() {
      let _this = this;
      axios.post("index", {
          User: _this.$root.Name,
          Check: md5(_this.$root.Check)
      }).then(function(reponse) {
        if (reponse.data.check!="false"){
          _this.tableData.splice(0,2);
          // 下面是获取文件目录，利用了临时变量，同时push函数触发了视图更新
          var file = 0;
          _this.$root.Check = reponse.data.check;

          for( file = 0; file < reponse.data.Data.length; file++){
            _this.tableData.push({
              name: reponse.data.Data[file].name,
              date: reponse.data.Data[file].date,
              size: reponse.data.Data[file].size
            })
          }
        } else {
          Bus.$emit('state_change_App', false);
          _this.open_err('请重新登入')
        }
        
      }).catch(function(error) {
        console.log(error);
      });
    }
  }
</script>