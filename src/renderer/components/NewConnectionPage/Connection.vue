<template>
  <a-form ref="formRef" :form="form" :model="formData" :rules="ruleInline" style="width: 57%;margin: 0 auto;">
    <a-form-item prop="name">
      <a-input type="text" v-model="formData.name" placeholder="Connection Name">
        <span slot="prepend">Name</span>
      </a-input>
    </a-form-item>
    <a-form-item prop="host">
      <a-input type="text" v-model="formData.host" placeholder="Redis-server host">
        <span slot="prepend">Host</span>
      </a-input>
    </a-form-item>
    <a-form-item prop="port">
      <a-input type="text" v-model="formData.port" placeholder="Redis-server port (6379)" number>
        <span slot="prepend">Port</span>
      </a-input>
    </a-form-item>
    <a-form-item prop="auth">
      <a-input type="password" v-model="formData.auth" placeholder="Redis-server authentication password">
        <span slot="prepend">Auth</span>
      </a-input>
    </a-form-item>
    <a-form-item prop="_id" hidden>
      <a-input type="password" v-model="formData._id" placeholder="id">
      </a-input>
    </a-form-item>
    <a-form-item prop="color">
      <a-tag type="dot" :color="cr" v-for="cr in colors" :key="cr" @click.native="pickColor(cr)" :class="{picked: cr === formData.color}"></a-tag>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'connection',
  props: ['initForm'],
  data () {
    return {
      formData: {
        name: '',
        host: '',
        port: null,
        auth: '',
        password: '',
        color: '#fff',
        _id: null
      },
      form: this.$form.createForm(this),
      colors: ['#fff', '#19be6b', '#5cadff', '#ed4014', '#ff9900', '#FFA2D3', '#fadb14', '#c5c8ce'],
      ruleInline: {
        name: [
          { required: true, message: 'Please fill in the name', trigger: 'blur' }
        ],
        host: [
          { required: true, message: 'Please fill in the host.', trigger: 'blur' },
          { type: 'string', min: 6, message: 'The host length cannot be less than 6 bits', trigger: 'blur' }
        ],
        port: { type: 'number', min: 1, max: 65535, message: 'The port have to be between 1 and 65535' }
      }
    }
  },
  methods: {
    pickColor (color) {
      this.formData.color = color
    }
  },
  watch: {
    // 如果想在props的更新后更新组件 必须监听props
    initForm (value, old) {
      this.formData = Object.assign({}, this.formData, value)
    }
  }
}
</script>

<style lang="less" scoped>
.ant-form-item-children {
  span {
    display: inline-block;
    width: 25px;
    height: 25px;
    border-radius: 5px;
    padding: 2px;
    background-clip: content-box;
  }
  .picked {
    border: 1px dashed #777 !important;
  }
}

</style>
