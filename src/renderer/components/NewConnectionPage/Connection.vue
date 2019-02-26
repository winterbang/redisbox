<template>
  <Form ref="formRef" :model="formData" :rules="ruleInline" style="width: 57%;margin: 0 auto;">
    <FormItem prop="name">
      <Input type="text" v-model="formData.name" placeholder="Connection Name">
        <span slot="prepend">Name</span>
      </Input>
    </FormItem>
    <FormItem prop="host">
      <Input type="text" v-model="formData.host" placeholder="Redis-server host">
        <span slot="prepend">Host</span>
      </Input>
    </FormItem>
    <FormItem prop="port">
      <Input type="text" v-model="formData.port" placeholder="Redis-server port (6379)">
        <span slot="prepend">Port</span>
      </Input>
    </FormItem>
    <FormItem prop="auth">
      <Input type="password" v-model="formData.auth" placeholder="Redis-server authentication password">
        <span slot="prepend">Auth</span>
      </Input>
    </FormItem>
    <!-- <FormItem prop="color">
      <Button type="dashed" size="small">
        <Icon type="ios-close" size="20"/>
      </Button>
      <Button type="dashed" shape="circle" icon="ios-bookmark">
      </Button>
      <Button type="info" shape="circle" icon="ios-bookmark"> </Button>
    </FormItem> -->
    <FormItem prop="color">
      <Tag type="dot" :color="cr" v-for="cr in colors" @click.native="pickColor(cr)" :class="{picked: cr === formData.color}"></Tag>
    </FormItem>
  </Form>
  <!-- <form>
    <div class="form-group">
      <label>Name</label>
      <input v-model="formData.name" class="form-control" placeholder="Connection Names">
    </div>
    <div class="form-group">
      <label>Host</label>
      <input v-model="formData.host" class="form-control" placeholder="Redis-server host">
    </div>
    <div class="form-group">
      <label>Port</label>
      <input v-model="formData.port" class="form-control" placeholder="Redis-server port (6379)">
    </div>
    <div class="form-group">
      <label>Auth</label>
      <input v-model="formData.auth" type="password" class="form-control" placeholder="Redis-server authentication password">
    </div>
  </form> -->
</template>

<script>
export default {
  name: 'connection',
  data () {
    return {
      formData: {
        name: '',
        host: '',
        port: '',
        auth: '',
        password: '',
        color: '#fff'
      },
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
  }
}
</script>

<style lang="css">
.ivu-input-group-prepend span {
  display: inline-block;
  width: 30px;
}
.ivu-tag-dot-inner {
  margin-right: 0;
}
.picked {
  border: 1px dashed #777 !important;
}
</style>
