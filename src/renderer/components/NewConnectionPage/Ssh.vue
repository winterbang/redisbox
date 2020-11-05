<template>
  <a-form ref="formRef" :model="formData" style="width: 57%;margin: 0 auto;">
    <a-form-item prop="name">
      <a-checkbox v-model="formData.useSSHTunnel">Use SSH Tunnel</a-checkbox>
    </a-form-item>
    <a-form-item prop="host">
      <a-input type="text" v-model="formData.host" placeholder="Server host">
        <span slot="prepend">Host</span>
      </a-input>
    </a-form-item>
    <a-form-item prop="port">
      <a-input type="text" v-model="formData.port" placeholder="Server port (22)" number>
        <span slot="prepend">Port</span>
      </a-input>
    </a-form-item>
    <a-form-item prop="auth">
      <a-input type="password" v-model="formData.username" placeholder="Server user name">
        <span slot="prepend">UserName</span>
      </a-input>
    </a-form-item>
    <a-form-item prop="path" >
      <a-input type="text" disabled v-model="formData.privateKey" placeholder="Private key path">
        <span slot="prepend">Path</span>
        <a-icon type="ios-search" slot="suffix" />
      </a-input>
      <a-upload
        :before-upload="handleUpload"
        action="">
        <a-button>...</a-button>
      </a-upload>
    </a-form-item>
    <a-form-item prop="password" >
      <a-input type="password" v-model="formData.password" placeholder="Password">
        <span slot="prepend">Password</span>
      </a-input>
    </a-form-item>
    <!-- <RadioGroup v-model="vertical" vertical>
        <Radio label="apple">
            <Icon type="social-apple"></Icon>
            <span>Apple</span>
        </Radio>
        <Radio label="android">
            <Icon type="social-android"></Icon>
            <span>Android</span>
        </Radio>
        <Radio label="windows">
            <Icon type="social-windows"></Icon>
            <span>Windows</span>
        </Radio>
    </RadioGroup> -->
  </a-form>
</template>

<script>
export default {
  name: 'ssh',
  data () {
    return {
      formData: {
        useSSHTunnel: false,
        host: '',
        port: null,
        username: '',
        privateKey: null,
        password: null
      }
    }
  },
  methods: {
    handleUpload (file) {
      this.formData.path = file.path
      console.log(file)
      return false
    }
  }
}
</script>

<style lang="css">
</style>
