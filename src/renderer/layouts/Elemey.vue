<template>
  <div style="height:100%">
    <el-container>
      <el-aside width="200pxs">
        <el-container>
          <el-main>Main</el-main>
          <el-footer>
            <el-button type="primary" @click="dialogFormVisible = true">connect</el-button>
            <el-button type="primary" @click="importOrExport">导入/导出</el-button>
            <el-button type="primary" @click="onclick">open raw window</el-button>
            <button>原生组件</button>
          </el-footer>
        </el-container>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" label-width="120px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Button, Aside, Header, Footer, Main, Dialog, Form, Input } from 'element-ui'
import { ipcRenderer, remote } from 'electron'

export default {
  name: 'elemey',
  components: { Button, Aside, Header, Footer, Main, Dialog, Form, Input },
  data () {
    return {
      dialogFormVisible: false,
      form: {}
    }
  },
  methods: {
    importOrExport () {
      remote.dialog.showOpenDialog()
    },
    onclick () {
      const { BrowserWindow } = remote
      let win = new BrowserWindow({width: 800, height: 600})
      win.on('closed', () => {
        win = null
      })
      console.log(ipcRenderer.sendSync('synchronous-message', 'ping'))
      // ipcRenderer.send('asynchronous-message', 'ping')
      // ipcRenderer.on('asynchronous-reply', (event, arg) => {
      //   console.log(arg) // prints "pong"
      // })
    }
  }
}
</script>

<style lang="css">
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    border: 1px solid #000;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    height: 100%;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    border: 1px solid #000;
  }

  .el-container {
    height: 100%;
  }

</style>
