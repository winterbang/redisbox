<template>
  <div style="overflow-y: scroll;display:flex;justify-content: center;padding:20px 0">
    <a-card title="About Redisbox" icon="ios-options" :padding="0" shadow style="width: 70%">
      <a-list item-layout="horizontal" :data-source="data">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-list-item-meta :description="item.desc">
            <a-tag slot="title" @click="openBrowser(item.desc)">{{ item.title }}</a-tag>
            <!-- <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            /> -->
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import { shell } from 'electron'
export default {
  name: 'information',
  data() {
    return {
      version: '',
      data: [
        {
          title: 'version',
          desc: '1.0.0'
        },
        {
          title: 'Github',
          desc: 'https://github.com/winterbang/redisbox'
        },
        {
          title: 'Website',
          desc: 'http://redisbox.com'
        },
        {
          title: 'Telegram',
          desc: 'tg://join?invite=DT4gRA5methtroPJ-lIYKQ'
        },
        {
          title: 'Auther',
          desc: 'winter'
        },
        {
          title: '联系邮箱',
          desc: 'winterbang@126.com'
        }
      ]
    }
  },
  methods: {
    openBrowser(url = 'http://blog.zhchsh.xyz') {
      if (url.includes('http')) shell.openExternal(url)
    }
  },
  created() {
    this.version = process.env.npm_package_version
    // console.log(procwwwess.env)
  }
}
</script>
<style lang="css" scoped>
</style>
