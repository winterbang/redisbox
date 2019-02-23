<template>
  <div style="overflow-y: scroll; display: flex;justify-content: center;margin: 0 auto;padding: 20px">
    <Form>
      <FormItem label="语言">
        <Select v-model="formData.language" style="width:200px">
          <Option v-for="item in ['中文', 'English']" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </FormItem>
      <!-- <FormItem label="窗口模式" v-model="switchValue">
        <i-switch size="large">
          <span slot="open">单窗口</span>
          <span slot="close">多窗口</span>
        </i-switch>
      </FormItem> -->
      <FormItem label="窗口模式" >
        <RadioGroup v-model="formData.windowModal">
          <Radio label="single">
            <!-- <Icon type="logo-apple"></Icon> -->
            <span>单窗口</span>
          </Radio>
          <Radio label="multiple" disabled>
            <!-- <Icon type="logo-android"></Icon> -->
            <span>多窗口</span>
          </Radio>
        </RadioGroup>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  name: 'setting',
  data () {
    return {
      switchValue: '',
      formData: {
        windowModal: 'single', // multiple
        language: ''
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
