<template lang="html">
  <div style="overflow-y: scroll; display: flex;flex-direction: column;justify-content: center;margin: 0 auto;padding: 20px">
    <Alert show-icon>您的意见是我们不断进步的动力，请留下您在使用中遇到的问题或提出宝贵的建议。</Alert>
    <Form :model="formItem" :label-width="80">
      <FormItem label="Detail">
        <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="称呼">
        <Input v-model="formItem.input" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="Email">
        <Input v-model="formItem.input" placeholder="Enter your email"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary">Submit</Button>
        <Button style="margin-left: 8px">Cancel</Button>
      </FormItem>
    </Form>
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
        input: '',
        select: '',
        radio: 'male',
        checkbox: [],
        switch: true,
        date: '',
        time: '',
        slider: [20, 50],
        textarea: ''
      }
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
