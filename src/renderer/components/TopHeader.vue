<template>
  <div class="toolbar-actions">
    <button class="btn btn-default">
      <router-link to="/">
        <span class="icon icon-home"></span>
      </router-link>
    </button>

    <div class="btn-group">
      <button class="btn btn-default active" title="connection" @click="visibel = true">
        <span class="icon icon-menu"></span>
      </button>
      <button class="btn btn-default" title="connection" @click="visibel = true">
        <span class="icon icon-plus"></span>
      </button>
      <button class="btn btn-default">
        <span class="icon icon-folder"></span>
      </button>
      <button class="btn btn-default active">
        <span class="icon icon-cloud"></span>
      </button>
      <button class="btn btn-default">
        <span class="icon icon-popup"></span>
      </button>
      <button class="btn btn-default" @click="increment">
        <span class="icon icon-shuffle"></span>
      </button>
    </div>
    <span>当前链接：{{$router.path}}</span>
    <button class="btn btn-default btn-dropdown pull-right">
      <span class="icon icon-megaphone"></span>
    </button>
    <new-connection :visibel.sync="visibel"></new-connection>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import NewConnection from './NewConnectionPage/Index'

export default {
  name: 'top-header',
  components: { NewConnection },
  data () {
    return {
      visibel: false
    }
  },
  computed: mapState(['curConnectionName']),
  methods: {
    ...mapActions(['increment']),
    onCancel () {
      this.visibel = false
    }
  }
}
</script>

<style lang="css" scoped>

</style>
