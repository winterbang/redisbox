<template lang="html">
  <div style="display: flex;flex-direction: column;justify-content: center;margin: 0 auto;padding: 20px">
    <a-alert message="您的意见是我们不断进步的动力，请留下您在使用中遇到的问题或提出宝贵的建议。" type="info" show-icon></a-alert>
    <a-form :model="formItem" :label-width="80">
      <a-form-item label="Detail">
        <a-input v-model="formItem.detail" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></a-input>
      </a-form-item>
      <a-form-item label="称呼">
        <a-input v-model="formItem.username" placeholder="Enter your call"></a-input>
      </a-form-item>
      <a-form-item label="Email">
        <a-input v-model="formItem.email" placeholder="Enter your email"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="onSubmit">Submit</a-button>
        <!-- <Button style="margin-left: 8px">Cancel</Button> -->
      </a-form-item>
    </a-form>
    感谢您对Redisbox的支持！
    我们相信您的反馈能让Redisbox日趋完善，能让更多的人以更有效的方式使用Redis数据库。
    <!-- <webview id="foo" src="https://blog.zhangmoumou.com/redisbox" style="display:inline-flex; width:640px; height:480px"></webview> -->

  </div>
</template>

<script>
// import Gitment from 'gitment'

export default {
  name: 'feedback',
  data () {
    return {
      formItem: {
        detail: '',
        email: '',
        username: ''
      }
    }
  },
  methods: {
    onSubmit () {
      window.open(`mailto:2725843804@qq.com?subject=${this.formItem.username}+${this.formItem.email}&body=${this.formItem.detail}`)
    }
  },
  mounted () {
  },
  beforeRouteEnter (to, from, next) {
    console.log(to)
    console.log('query=========')
    next()
  },
  beforeRouteUpdate (to, from, next) {
    console.log(to)
    console.log('query=========')
    next()
  }
}
</script>
<style lang="css" scoped>
</style>
