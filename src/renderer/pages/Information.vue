<template>
  <div style="overflow-y: scroll;display:flex;justify-content: center;padding:20px 0">
    <Card title="About Redisbox" icon="ios-options" :padding="0" shadow style="width: 70%">
      <CellGroup>
         <Cell title="Version" :extra="version" />
         <Cell title="Github" extra="https://winterbang.github.com/redisbox" to="https://winterbang.github.com/redisbox" />
         <Cell title="Website" @click.native="openBrowser()">
           <div slot="extra">
             https://blog.zhangmoumou.com/redisbox
             <Icon type="ios-browsers-outline" size="22" />
           </div>
         </Cell>
         <Cell title="Telegram" @click.native="openBrowser('tg://join?invite=DT4gRA5methtroPJ-lIYKQ')">
           <div slot="extra">
             <Icon type="ios-browsers-outline" size="22" />
           </div>
         </Cell>
         <Cell title="Auther" extra="winter" />
     </CellGroup>
    </Card>
  </div>
</template>

<script>
import { shell } from 'electron'
export default {
  name: 'information',
  data () {
    return {
      version: ''
    }
  },
  methods: {
    openBrowser (url = 'https://blog.zhangmoumou.com') {
      shell.openExternal(url)
    }
  },
  created () {
    this.version = process.env.npm_package_version
    // console.log(procwwwess.env)
  }
}
</script>
<style lang="css" scoped>
.ivu-card-head p {
  font-size: 36px;
  height: 36px
}
.ivu-cell {
  font-size: 18px !important;
}
.ivu-cell-arrow {
  font-size: 22px;
}
.ivu-cell-title {
  line-height: 52px;
  font-size: 22px;
}
</style>
