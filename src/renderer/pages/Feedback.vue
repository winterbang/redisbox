<template lang="html">
  <div>
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
    感谢您对有道的支持！
    我们相信您的反馈能让Redisbox日趋完善，能让更多的人以更有效的方式使用Redis数据库。
  </div>
</template>

<script>
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
