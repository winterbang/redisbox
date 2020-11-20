<template>
  <div style="display: flex;justify-content: center;margin: 0 auto;padding: 20px">
    <a-form :label-width="70">
    <!-- <Form style="width: 57%;margin: 0 auto;"> -->
      <a-form-item label="Language">
        <a-select v-model="formData.local" disabled>
          <a-select-option v-for="item in ['中文', 'English']" :value="item" :key="item">{{ item }}</a-select-option>
        </a-select>
      </a-form-item>
      <!-- <FormItem label="窗口模式" v-model="switchValue">
        <i-switch size="large">
          <span slot="open">单窗口</span>
          <span slot="close">多窗口</span>
        </i-switch>
      </FormItem> -->
      <a-form-item label="窗口模式" >
        <a-radio-group v-model="formData.windowModal">
          <a-radio label="single">
            <!-- <Icon type="logo-apple"></Icon> -->
            <span>单窗口</span>
          </a-radio>
          <a-radio label="multiple" disabled>
            <!-- <Icon type="logo-android"></Icon> -->
            <span>多窗口</span>
          </a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
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
        local: 'zh-cn'
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
