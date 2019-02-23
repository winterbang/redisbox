<template>
  <form>
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
    <!-- <select class="form-control">
      <option>Option one</option>
      <option>Option two</option>
      <option>Option three</option>
      <option>Option four</option>
      <option>Option five</option>
      <option>Option six</option>
      <option>Option seven</option>
      <option>Option eight</option>
    </select> -->

    <!-- <div class="form-actions">
      <button type="submit" class="btn btn-form btn-default">Cancel</button>
      <button type="submit" class="btn btn-form btn-primary">OK</button>
    </div> -->
  </form>
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
        auth: ''
      }
    }
  }
}
</script>

<style lang="css">
</style>
